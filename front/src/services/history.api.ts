import type { ImageInputRequest, ImageOutputResponse } from '@/types/history';

const API_URL = 'http://localhost:8001/histories';

// Créer un historique
export async function createHistory(data: ImageInputRequest): Promise<ImageOutputResponse> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Erreur lors de la création de l'historique");
  return await res.json();
}

// Récupérer un historique par son id
export async function getHistory(userId: number): Promise<ImageOutputResponse> {
  const res = await fetch(`${API_URL}/${userId}`);
  if (!res.ok) throw new Error('Historique non trouvé');
  return await res.json();
}

// Récupérer tous les historiques d'un utilisateur
export async function getAllHistories(userId: number): Promise<ImageOutputResponse[]> {
  const res = await fetch(`${API_URL}?userId=${userId}`);
  if (!res.ok) throw new Error('Erreur lors de la récupération des historiques');
  return await res.json();
}

// Supprimer un historique
export async function deleteHistory(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'historique");
}
