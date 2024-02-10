export interface ITask {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ITasks {
  [key: string]: ITask;
}

export interface IColumns {
  [key: string]: IColumn;
}

export interface IData {
  tasks: ITasks;
  columns: IColumns;
  columnOrder: string[];
}
