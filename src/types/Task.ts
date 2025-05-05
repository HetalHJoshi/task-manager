export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  DONE = 'done',
}

export interface Task {
  id: string;
  title: string;
  desc: string;
  status: TaskStatus;
}
