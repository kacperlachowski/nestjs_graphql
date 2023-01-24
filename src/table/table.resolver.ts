import { Inject } from '@nestjs/common';
import { Args, Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Table } from 'src/schema/graphql';

enum SUBSCRIPTION_EVENTS {
  newTable = 'newTable',
}

@Resolver()
export class TableResolver {
  tables: Table[] = [];

  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}

  @Query()
  table() {
    return this.tables;
  }

  @Mutation()
  addTable(
    @Args('name') name: string,
    @Args('description') description: string | null,
  ) {
    const result = {
      id: this.tables.length + 1,
      name: name,
      description: description,
    };

    this.tables.push(result);

    this.pubSub.publish(SUBSCRIPTION_EVENTS.newTable, { newTable: result });

    return result;
  }

  @Subscription()
  newTable() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newTable);
  }
}
