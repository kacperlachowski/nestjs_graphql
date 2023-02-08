import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Row } from 'src/schema/graphql';

enum SUBSCRIPTION_EVENTS {
  newRow = 'newRow',
}

@Resolver()
export class RowResolver {
  rows: Row[] = [];

  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}

  @Query()
  row() {
    return this.rows;
  }

  @Mutation()
  addRow(@Args('values') values: string, @Args('tableId') tableId: number) {
    const result: Partial<Row> = {};

    console.log('add row', values, tableId);

    this.pubSub.publish(SUBSCRIPTION_EVENTS.newRow, { newRow: result });

    return result;
  }

  @Subscription()
  newRow() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newRow);
  }
}
