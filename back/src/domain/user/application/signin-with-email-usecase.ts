
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import config from '../../../infrastructure/core/config';
import Logger from '../../logger.port';
import { container, inject, injectable } from 'tsyringe';
import { SingInDTO } from '../user.dto';
import { UserRepository } from '../user.repository';



export class LoginUser {
  private secret = config.JWT_SECRET!;
  private users: UserRepository;
  private logger: Logger;
  
  constructor(
  ) {
    this.users = container.resolve<UserRepository>('UserRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute(credentials: SingInDTO): Promise<{ token: string }> {
    this.logger.debug('[LoginUser usecase] Start');
    
    const user = await this.users.findByemailAndPassword(credentials);
    if (!user) {
      this.logger.warning('[LoginUser usecase] User not found');
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
    if (!isPasswordValid) {
      this.logger.warning('[LoginUser usecase] Invalid password');
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ sub: user.id }, this.secret, { expiresIn: "7d" });
    
    this.logger.debug('[LoginUser usecase] Success');
    return { token };
  }
}
