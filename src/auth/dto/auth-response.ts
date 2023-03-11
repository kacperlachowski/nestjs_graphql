import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.model';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
