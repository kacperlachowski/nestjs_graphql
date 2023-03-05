import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteColumnInput {
  @Field(() => String, {
    nullable: false,
  })
  tableId: string;
}
