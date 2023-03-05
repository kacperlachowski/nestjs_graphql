import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CaolumnDocument = Column & Document;

@Schema()
@ObjectType()
export class Column {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String)
  name: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
