import { Note } from "./Note";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  dueDate: Date;
  remindDate: Date;
  nextActions: Note[];
  completed: boolean;
  completedDate: Date;
}
