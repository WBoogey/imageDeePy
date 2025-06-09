import { ImageInputDTO, ImageOutputDTO } from "./historyDto";

export interface HistoryRepository {
  create(args: ImageInputDTO): Promise<ImageOutputDTO>;
  findById(id: number): Promise<ImageOutputDTO | null>;
  list(userId: number): Promise<ImageOutputDTO[]>;
  delete(id: number): Promise<void |'BOOK_NOT_FOUND'>;
}
