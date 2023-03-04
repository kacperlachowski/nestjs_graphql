import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateColumnInput {
  @Field(() => String, {
    nullable: false,
  })
  columnId: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  description: string;
}
