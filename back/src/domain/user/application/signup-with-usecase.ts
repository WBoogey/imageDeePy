import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../../infrastructure/core/config';
import Logger from '../../logger.port';
import { container } from 'tsyringe';
import { SignUpDTO } from '../user.dto';
import { UserRepository } from '../user.repository';

export class RegisterUser {
  private secret = config.JWT_SECRET!;
  private users: UserRepository;
  private logger: Logger;

  constructor() {
    this.users = container.resolve<UserRepository>('UserRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute(userData: SignUpDTO): Promise<{ token: string }> {
    this.logger.debug('[RegisterUser usecase] Start');

    // Vérifier si l'email est déjà utilisé
    const existingUser = await this.users.findByemailAndPassword(userData);
    if (existingUser) {
      this.logger.warning('[RegisterUser usecase] Email already registered');
      throw new Error('Email already registered');
    }

    // Hacher le mot de passe
    const password = await bcrypt.hash(userData.password, 10);

    // Créer le nouvel utilisateur
    const newUser = await this.users.registerUser({
      email: userData.email,
      username: userData.username,
      password,
    });

    // Générer le token JWT
    const token = jwt.sign({ sub: newUser.id }, this.secret, { expiresIn: '7d' });

    this.logger.debug('[RegisterUser usecase] Success');
    return { token };
  }
}