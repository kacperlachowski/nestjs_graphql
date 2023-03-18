import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TableFilters {
  @Field({ nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  name?: string[];

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  description?: string[];

  @Field({ nullable: true })
  first?: number;

  @Field({ nullable: true })
  offset?: number;
}
