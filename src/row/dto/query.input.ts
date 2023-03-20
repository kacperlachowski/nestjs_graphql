import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RowQueryInput {
  @Field({ nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  names?: string[];
}
