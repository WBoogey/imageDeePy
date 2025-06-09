import { injectable } from 'tsyringe';
import { histories } from '../../db/schema';
import type { HistoryRepository } from "../../../../domain/history/history.repository";
import { eq, desc } from 'drizzle-orm';
import { db } from "../../db";
import { ImageInputDTO, ImageOutputDTO } from '../../../../domain/history/historyDto';

@injectable()
export class DrizzleHistoryRepository implements HistoryRepository {

  constructor(){}

  async create(args: ImageInputDTO): Promise<ImageOutputDTO> {
    type HystorySelect = typeof histories.$inferSelect;

    const hystory = await db
      .insert(histories)
      .values({
        userId: args.userId,
        prompt: args.prompt,
        imagePath: args.imageUrl,
      })
      .execute() as unknown as HystorySelect;

    if (!hystory) {
      throw new Error('Erreur lors de la création de l\'historique');
    }

    return {
      id: hystory.id,
      userId: hystory.userId,
      prompt: hystory.prompt,
      imageUrl: hystory.imagePath,
      createdAt: hystory.createdAt
    };
  }

  async findById(id: number): Promise<ImageOutputDTO | null> {
    const result = await db
      .select()
      .from(histories)
      .where(eq(histories.id, id))
      .then(rows => rows[0] || null);

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      userId: result.userId,
      prompt: result.prompt,
      imageUrl: result.imagePath,
      createdAt: result.createdAt
    };
  }

  async list(userId: number): Promise<ImageOutputDTO[]> {
    const results = await db
      .select()
      .from(histories)
      .where(eq(histories.userId, userId))
      .orderBy(desc(histories.createdAt));

    return results.map(result => ({
      id: result.id,
      userId: result.userId,
      prompt: result.prompt,
      imageUrl: result.imagePath,
      createdAt: result.createdAt
    }));
  }

  async update(id: number, args: Partial<ImageInputDTO>): Promise<ImageOutputDTO> {
    await db
      .update(histories)
      .set({
        prompt: args.prompt,
        imagePath: args.imageUrl,
      })
      .where(eq(histories.id, id))
      .execute();

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`Historique avec id ${id} non trouvé après mise à jour`);
    }
    return updated;
  }

  async delete(id: number): Promise<void> {
    await db
      .delete(histories)
      .where(eq(histories.id, id))
      .execute();
  }
}