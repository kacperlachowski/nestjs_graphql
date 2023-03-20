import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Column } from 'src/column/entities/column.schema';
import { Row, RowDocument } from 'src/row/entities/row.schema';

export type TableDocument = Table & Document;

@Schema()
@ObjectType()
export class Table {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Table header' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Short description' })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Column.name }])
  columns: Column[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Row.name }])
  rows: RowDocument[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TableSchema = SchemaFactory.createForClass(Table);
