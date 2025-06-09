import {
  Body,
  Controller,
  Response,
  Post,
  Route,
  SuccessResponse,
  Tags,
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


// Types spécifiques à l'API (pour TSOA)
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
  token: string;
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
  async register(@Body() requestBody: SignUpRequest): Promise<{ token: string }> {
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
}