import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteRowInput {
  @Field(() => String, {
    nullable: false,
  })
  rowId: string;
}
