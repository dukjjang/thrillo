import { boardsData } from '../constants/boardsData';

export const useSortBoards = () => {
  const sortedBoards = boardsData.map((board) => {
    const filteredCards = board.cards.sort((a, b) => a.id - b.id);
    const filteredBoard = { ...board, cards: filteredCards };
    return filteredBoard;
  });
  return sortedBoards;
};
