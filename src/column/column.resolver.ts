import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Column } from 'src/schema/graphql';

enum SUBSCRIPTION_EVENTS {
  newColumn = 'newColumn',
}

@Resolver()
export class ColumnResolver {
  columns: Column[] = [];

  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}

  @Query()
  column() {
    return this.columns;
  }

  @Mutation()
  addColumn(@Args('name') name: string, @Args('tableId') tableId: number) {
    const result: Partial<Column> = {
      id: this.columns.length + 1,
      name,
    };

    console.log('add column', result, tableId);

    this.pubSub.publish(SUBSCRIPTION_EVENTS.newColumn, { newColumn: result });

    return result;
  }

  @Subscription()
  newColumn() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newColumn);
  }
}
