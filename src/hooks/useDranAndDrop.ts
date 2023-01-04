import { useState, DragEvent, Dispatch, SetStateAction } from 'react';
import { IBoard } from '../types/Types';

export const useDragAndDrop = (
  boards: IBoard[],
  setBoards: Dispatch<SetStateAction<IBoard[]>>
) => {
  const [targetCard, setTargetCard] = useState({
    boardId: -1,
    cardId: -1,
  });
  const [dragCard, setDargCard] = useState({ boardId: 0, cardId: 0 });

  const handleDragStart = (boardId: number, cardId: number): void => {
    setDargCard({ boardId, cardId });
  };

  const handleDrop = (e: DragEvent<HTMLElement>): void => {
    const cardId = dragCard.cardId;
    const target = e.target as HTMLElement;

    const from = dragCard.boardId;
    const to = Number(e.currentTarget.id);

    const targetCardId =
      target.tagName === 'UL' ? boards[to].cards.length : targetCard.cardId;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[from].cards[cardId];
    tempBoardsList[from].cards.splice(cardId, 1);
    tempBoardsList[to].cards.splice(targetCardId, 0, sourceCard);
    setBoards(tempBoardsList);

    setTargetCard({
      boardId: -1,
      cardId: -1,
    });
    setDargCard({ boardId: 0, cardId: 0 });
  };

  const handleDragEnter = (boardId: number, cardId: number): void => {
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  const dragMargin = (boardId: number, cardId: number) => {
    if (
      targetCard.boardId === boardId &&
      targetCard.cardId === cardId &&
      targetCard.cardId !== -1
    ) {
      return 'mt-5';
    }
  };

  return {
    dragMargin,
    handleDragStart,
    handleDragEnter,
    handleDrop,
    targetCard,
  };
};
