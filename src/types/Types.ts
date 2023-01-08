export interface Issue {
  id: number;
  title: string;
  content: string;
  state: string;
  deadLine: string;
  managers: string[];
  image: string;
}

export interface IBoard {
  id: number;
  state: string;
  name: string;
  cards: Issue[];
}
