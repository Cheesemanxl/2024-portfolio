import { Task } from "./task";

export interface Category {
  id: number;
  type: string;
  title: string;
  tasks: Task[];
}
