import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class User {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Field()
  username: string;
}
