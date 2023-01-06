import { useState, DragEvent, Dispatch, SetStateAction } from 'react';
import { IBoard } from '../types/Types';

export const useDragAndDrop = (
  boards: IBoard[],
  filteredBoards: IBoard[],
  setBoards: Dispatch<SetStateAction<IBoard[]>>,
  targetCard: { boardId: number; cardId: number },
  setTargetCard: Dispatch<SetStateAction<{ boardId: number; cardId: number }>>
) => {
  const [dragCard, setDargCard] = useState({ boardId: 0, cardId: 0 });
  const [filteredTargetId, setFilteredTargetId] = useState(0);

  const handleDragStart = (boardId: number, cardId: number): void => {
    const originalIndex = boards[boardId].cards.findIndex(
      (card) => card.id === cardId
    );
    setDargCard({ boardId, cardId: originalIndex });
  };

  const handleDrop = (e: DragEvent<HTMLElement>): void => {
    const cardId = dragCard.cardId;
    const from = dragCard.boardId;
    const to = Number(e.currentTarget.id);
    const tempBoardsList = [...boards];

    const sourceCard = tempBoardsList[from].cards[cardId];
    sourceCard.state = tempBoardsList[to].state;

    tempBoardsList[from].cards.splice(cardId, 1);

    tempBoardsList[to].cards.splice(targetCard.cardId, 0, sourceCard);

    setBoards(tempBoardsList);

    setTargetCard({
      boardId: -1,
      cardId: -1,
    });
    setDargCard({ boardId: 0, cardId: 0 });

    localStorage.setItem('boards', JSON.stringify(tempBoardsList));
  };

  const handleDragEnter = (boardId: number, cardId: number): void => {
    if (dragCard.boardId === boardId && dragCard.cardId === cardId) return;

    const originalTargetIndex = boards[boardId].cards.findIndex(
      (card) => card.id === cardId
    );

    const currentTargetIndex = filteredBoards[boardId].cards.findIndex(
      (card) => card.id === cardId
    );
    setFilteredTargetId(currentTargetIndex);

    setTargetCard({
      boardId: boardId,
      cardId: originalTargetIndex,
    });
  };

  const dragMargin = (boardId: number, cardId: number) => {
    if (
      filteredTargetId === dragCard.cardId &&
      targetCard.boardId === dragCard.boardId
    )
      return;

    if (
      targetCard.boardId === boardId &&
      filteredTargetId === cardId &&
      filteredTargetId !== -1
    ) {
      return 'mt-10';
    }
  };

  const handleDelete = (boardId: number, cardId: number) => {
    const tempBoardsList = [...boards];

    const originalIndex = tempBoardsList[boardId].cards.findIndex(
      (card) => card.id === cardId
    );

    tempBoardsList[boardId].cards.splice(originalIndex, 1);
    setBoards(tempBoardsList);

    localStorage.setItem('boards', JSON.stringify(tempBoardsList));

    setTargetCard({
      boardId: -1,
      cardId: -1,
    });
    setDargCard({ boardId: 0, cardId: 0 });
  };

  return {
    dragMargin,
    handleDragStart,
    handleDragEnter,
    handleDelete,
    handleDrop,
    targetCard,
  };
};
