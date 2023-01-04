export interface Issue {
  title: string;
  content: string;
  completed: boolean;
}

export interface IBoard {
  id: number;
  state: string;
  cards: Issue[];
}
