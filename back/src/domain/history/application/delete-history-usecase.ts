import { container } from 'tsyringe';
import { HistoryRepository } from '../history.repository';
import Logger from '../../logger.port';
import { ImageInputDTO, ImageOutputDTO } from '../historyDto';

class DeleteBook {
  private historyRepository: HistoryRepository;
  private logger: Logger;

  constructor() {
    this.historyRepository = container.resolve<HistoryRepository>('HistoryRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute(id: number): Promise<void | 'BOOK_NOT_FOUND'> {
    this.logger.debug('[Delete History usecase] Start');
    const data = await this.historyRepository.delete(id);
    if (!data) {
      return 'BOOK_NOT_FOUND';
    }
  }
}

export default DeleteBook;
