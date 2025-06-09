export interface HistoryItemProps {
  id: number;                 
  userId: string;
  prompt: string;
  imageUrl: string;
  createdAt: string |null;
}