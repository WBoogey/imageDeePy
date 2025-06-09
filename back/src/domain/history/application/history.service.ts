
import { ImageInputDTO, ImageOutputDTO } from '../historyDto';
import CreateHistory from './create-history-usecase';
import DeleteBook from './delete-history-usecase';
import GetBook from './get-history-usecase';
import ListBooks from './getAll-history-usecase';

export class HistoryService {
  async createHistory(data: ImageInputDTO): Promise<ImageOutputDTO> {
    return await new CreateHistory().execute(data);
  }

  async getHistory(id: number): Promise<ImageOutputDTO | null> {
    return await new GetBook().execute(id);
  }

  async getAllHistories(userId: number): Promise<ImageOutputDTO[]> {
    return await new ListBooks().execute(userId);
  }

  async deleteHistory(id: number): Promise<void> {
    await new DeleteBook().execute(id);
  }
}
