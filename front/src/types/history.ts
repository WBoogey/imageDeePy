// Types pour l'historique (History)

export interface ImageInputRequest {
  userId: number;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
}

export interface ImageOutputResponse {
  id: number;
  userId: number;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
}
