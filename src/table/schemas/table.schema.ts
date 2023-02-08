import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Column } from 'src/column/schemas/column.schema';
import { Row } from 'src/row/schemas/row.schema';

export type TableDocument = Table & Document;

@Schema()
export class Table {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Column.name }])
  columns: [Column];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Column.name }])
  rows: [Row];
}

export const TableSchema = SchemaFactory.createForClass(Table);
