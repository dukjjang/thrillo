import { boardsData } from '../constants/boardsData';

export const useSortBoards = () => {
  const sortedBoards = boardsData.map((board) => {
    const filteredCards = board.cards.sort((a, b) => b.id - a.id);
    const filteredBoard = { ...board, cards: filteredCards };
    return filteredBoard;
  });
  return sortedBoards;
};
