import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Column & Document;

@Schema()
export class Column {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
