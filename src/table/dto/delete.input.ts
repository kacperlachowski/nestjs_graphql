import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTableInput {
  @Field(() => String, {
    nullable: false,
  })
  id: string;
}
