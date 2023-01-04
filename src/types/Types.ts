export interface Issue {
  title: string;
  content: string;
  state: string;
  deadLine: string;
  manager: string;
}

export interface IBoard {
  id: number;
  state: string;
  cards: Issue[];
}
