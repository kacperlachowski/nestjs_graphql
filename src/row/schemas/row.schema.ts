import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Row & Document;

@Schema()
export class Row {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  values: string;
}

export const RowSchema = SchemaFactory.createForClass(Row);
