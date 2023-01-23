import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query()
  helloWorld(): string {
    return 'Hello world';
  }
}
