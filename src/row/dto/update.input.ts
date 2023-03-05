import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRowInput {
  @Field(() => String, {
    nullable: false,
  })
  rowId: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  values: string;
}
