import { container } from 'tsyringe';
import { UserRepository } from '../user.repository';
import { AuthResponseDto } from '../user.dto';

export class FindUserByIdUseCase {
  private users: UserRepository;

  constructor() {
    this.users = container.resolve<UserRepository>('UserRepository');
  }

  async execute(id: number): Promise<AuthResponseDto | null> {
    return await this.users.findByID(id);
  }
}
