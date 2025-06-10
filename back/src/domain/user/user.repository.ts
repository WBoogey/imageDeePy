import {AuthResponseDto, SignUpDTO, SingInDTO} from './user.dto'


export interface UserRepository {
  findByemailAndPassword(User : SingInDTO): Promise<AuthResponseDto | null>;
  registerUser(User : SignUpDTO): Promise<AuthResponseDto>;
  findByEmail(email: string): Promise<AuthResponseDto | null>;
  findByID(id: number):Promise<AuthResponseDto | null>
}