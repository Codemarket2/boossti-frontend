export interface IBoard {
  _id: string;
  title: string;
  columns: IBoardColumns;
}

export interface IBoardColumns {
  [key: string]: IBoardColumn;
}

export interface IBoardColumn {
  title: string;
  backgroundColor: string;
  items: IBoardItem[];
}

export interface IBoardItem {
  _id: string;
  title: string;
  description: string;
  backgroundColor: string;
}
