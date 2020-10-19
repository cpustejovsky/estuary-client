import { Note } from "./Note";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: Date;
  remindDate: Date;
  nextActions: Note[];
  completed: boolean;
  completedDate: Date;
}
