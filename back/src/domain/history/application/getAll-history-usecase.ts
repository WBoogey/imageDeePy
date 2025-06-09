import { container } from 'tsyringe';
import { HistoryRepository } from '../history.repository';
import Logger from '../../logger.port';
import { ImageInputDTO, ImageOutputDTO } from '../historyDto';

class ListBooks {
  private historyRepository: HistoryRepository;
  private logger: Logger;

  constructor() {
    this.historyRepository = container.resolve<HistoryRepository>('HistoryRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute(userId : number): Promise<ImageOutputDTO[]> {
    this.logger.debug('[GetAll History usecase] Start');
    return this.historyRepository.list(userId);
  }
}

export default ListBooks;
