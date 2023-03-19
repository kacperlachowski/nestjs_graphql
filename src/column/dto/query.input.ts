import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ColumnQueryInput {
  @Field({ nullable: true })
  tableId?: string;

  @Field({ nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  names?: string[];
}
