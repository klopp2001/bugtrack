//TODO:: можно сделать подтипы
export type Task = {
  taskId: string,
  name:string;
  key: string;
  description: string;
  owner: string; 
  issues: string[];
  priority: "HIGH" | "MIDDLE" | "LOW"; 
  createdAt: Date;
  members: string[];
}