import { boardsData } from './boardsData';

export const useSortBoards = () => {
  const localData = JSON.parse(localStorage.getItem('boards')!);
  const data = localData ? localData : boardsData;
  return data;
};
