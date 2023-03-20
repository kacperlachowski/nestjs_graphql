import { Field, InputType } from '@nestjs/graphql';

export enum ColumnType {
  STRING_COLUMN = 'STRING_VALUE',
  NUMBER_COLUMN = 'NUMBER_COLUMN',
  BOOLEAN_COLUMN = 'BOOLEAN_COLUMN',
}

@InputType()
export class CreateColumnInput {
  @Field(() => String, {
    nullable: false,
  })
  tableId: string;

  @Field(() => String, {
    nullable: false,
  })
  name: string;

  @Field(() => ColumnType, {
    nullable: false,
  })
  type: ColumnType;
}
