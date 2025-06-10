import {
  Body,
  Controller,
  Response,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Get,
  Path,
} from 'tsoa';
import { UserService } from '../../../../domain/user/application/user.service';
import { container, injectable } from 'tsyringe';


interface SignUpRequest {
  /** User email address
   * @format email
   */
  email: string;
  /** Username*/
  username: string;
  /** User password
   * @minLength 8
   */
  password: string;
}


interface SignInRequest {
  /** User email address
   * @format email
   */
  email: string;
  /** User password
   * @minLength 6
   */
  password: string;
}

interface SignInResponse {
  /** JWT authentication token */
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

@injectable()
@Route('users')
@Tags('Users')
export class UserController extends Controller {
  constructor(
    private userService: UserService 
  ) {
    super();
    this.userService = container.resolve(UserService);
  }

  /**
   * @summary Sign in user
   */
  @Post('/signin')
  @SuccessResponse(200, 'Authentication successful')
  @Response(400, 'Invalid request params')
  @Response(401, 'Invalid credentials')
  @Response(500, 'Internal server error')
  async signin(@Body() requestBody: SignInRequest): Promise<SignInResponse> {
    try {
      const result = await this.userService.signIn(requestBody);
      this.setStatus(200);
      return result;
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        this.setStatus(401);
        throw new Error('Invalid credentials');
      }
      this.setStatus(500);
      throw new Error('Internal server error');
    }
  }

    /**
   * @summary Register user
   */
  @Post('/register')
  @SuccessResponse(201, 'User registered successfully')
  @Response(400, 'Invalid request params')
  @Response(409, 'Email already registered')
  @Response(500, 'Internal server error')
  async register(@Body() requestBody: SignUpRequest): Promise<SignInResponse> {
    try {
      const result = await this.userService.signUp(requestBody);
      this.setStatus(201);
      return result;
    } catch (error) {
      if (error instanceof Error && error.message === 'Email already registered') {
        this.setStatus(409);
        throw new Error('Email already registered');
      }
      this.setStatus(500);
      throw new Error('Internal server error');
    }
  }

  /**
   * @summary Récupérer un utilisateur par son id
   */
  @Get('/find/:id')
  @SuccessResponse(200, 'Utilisateur trouvé')
  @Response(404, 'Utilisateur non trouvé')
  @Response(500, 'Erreur serveur')
  async findById(@Path() id: number): Promise<{ id: number; username: string; email: string; createdAt: Date }> {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        this.setStatus(404);
        throw new Error('Utilisateur non trouvé');
      }
      this.setStatus(200);
      return {
        id: user.id,
        username: user.userName,
        email: user.email,
        createdAt: user.createdAt
      };
    } catch (error) {
      this.setStatus(500);
      throw new Error('Erreur lors de la récupération de l\'utilisateur');
    }
  }
}