import { inject, injectable } from "tsyringe";
import { LoginUser } from "./signin-with-email-usecase";
import { SignUpDTO, SingInDTO } from "../user.dto";
import { RegisterUser } from "./signup-with-usecase";
import { FindUserByIdUseCase } from './find-user-by-id';

export class UserService {
  constructor(
  ) {}

  async signIn(credentials: SingInDTO): Promise<{ jwt: string; user: { id: number; username: string; email: string } }> {
    return await new LoginUser().execute(credentials);
  }

  async signUp(userData: SignUpDTO): Promise<{ jwt: string; user: { id: number; username: string; email: string } }> {
    return await new RegisterUser().execute(userData);
  }

  async getUserById(id: number) {
    return await new FindUserByIdUseCase().execute(id);
  }
}