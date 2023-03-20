import {
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/schema/graphql';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response';
import { JwtAuthGuard } from './gql-auth.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export interface AuthenticatedUser {
  userId: string;
}

@Resolver('AuthResolver')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: AuthenticatedUser) {
    const result = await this.usersService.findById(user.userId);
    return result;
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const token = await this.authService.generateToken(user);

    return {
      user,
      token,
    };
  }

  @Mutation(() => AuthResponse)
  async signup(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    const user = await this.authService.createUser(username, password);
    const token = await this.authService.generateToken(user);

    return {
      user,
      token,
    };
  }
}
