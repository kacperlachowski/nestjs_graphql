import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // @Prop({ required: true })
  // email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
