import { container } from 'tsyringe';
import { HistoryRepository } from '../history.repository';
import Logger from '../../logger.port';
import { ImageInputDTO, ImageOutputDTO } from '../historyDto';


class CreateHistory {
  private historyRepository: HistoryRepository;
  private logger: Logger;

  constructor() {
    this.historyRepository = container.resolve<HistoryRepository>('HistoryRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute(History:ImageInputDTO): Promise<ImageOutputDTO> {
    this.logger.debug('[Create History usecase] Start');
    return this.historyRepository.create(History);
  }
}

export default CreateHistory;

