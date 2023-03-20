import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TableFiltersFindOne {
  @Field({ nullable: false })
  id: string;
}
