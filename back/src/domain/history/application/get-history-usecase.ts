import { container } from 'tsyringe';
import { HistoryRepository } from '../history.repository';
import Logger from '../../logger.port';
import { ImageInputDTO, ImageOutputDTO } from '../historyDto';

class GetBook {
  private historyRepository: HistoryRepository;
  private logger: Logger;

  constructor() {
    this.historyRepository = container.resolve<HistoryRepository>('HistoryRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute(id: number): Promise<ImageOutputDTO | null> {
    this.logger.debug('[Get History usecase] Start');
    const data = await this.historyRepository.findById(id);
    return data ?? null;
  }
}

export default GetBook;
