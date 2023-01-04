import { useState, DragEvent, Dispatch, SetStateAction } from 'react';
import { IBoard } from '../types/Types';

export const useDragAndDrop = (
  boards: IBoard[],
  setBoards: Dispatch<SetStateAction<IBoard[]>>
) => {
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
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
      boardId: 0,
      cardId: 0,
    });
    setDargCard({ boardId: 0, cardId: 0 });
  };

  const handleDragEnter = (boardId: number, cardId: number): void => {
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  return { handleDragStart, handleDragEnter, handleDrop };
};
