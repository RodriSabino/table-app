export interface TaskItem {
  title: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  members?: string[];
  id?: string; // Añadir un id único puede ser útil para el drag and drop
} 