import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTableInput {
  @Field(() => String, {
    nullable: false,
    description: 'Table header',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Short description',
  })
  description: string;
}
