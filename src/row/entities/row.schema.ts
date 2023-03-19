import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type RowDocument = Row & Document;

@Schema()
@ObjectType()
export class Row {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    get: (values: MongooseSchema.Types.Mixed) => JSON.stringify(values),
    set: (values: MongooseSchema.Types.Mixed) => values,
  })
  values: MongooseSchema.Types.Mixed;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RowSchema = SchemaFactory.createForClass(Row);
