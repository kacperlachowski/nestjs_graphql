import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRowInput {
  @Field(() => String, {
    nullable: false,
  })
  tableId: string;

  @Field(() => String, {
    nullable: false,
  })
  values: object;
}
