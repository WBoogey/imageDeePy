import { inject, injectable } from "tsyringe";
import { LoginUser } from "./signin-with-email-usecase";
import { SignUpDTO, SingInDTO } from "../user.dto";
import { RegisterUser } from "./signup-with-usecase";



export class UserService {
  constructor(
  ) {}

  async signIn(credentials: SingInDTO): Promise<{ token: string }> {
    return await new LoginUser().execute(credentials);
  }

  async signUp(userData: SignUpDTO): Promise<{ token: string }> {
    return await new RegisterUser().execute(userData);
  }
}