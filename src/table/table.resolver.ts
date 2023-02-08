import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Model } from 'mongoose';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Table as TableDB, TableDocument } from './schemas/table.schema';

enum SUBSCRIPTION_EVENTS {
  newTable = 'newTable',
}

@Resolver()
export class TableResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    @InjectModel(TableDB.name) private tableModel: Model<TableDocument>,
  ) {}

  @Query()
  table() {
    // todo get data from db
    return [];
  }

  @Mutation()
  addTable(
    @Args('name') name: string,
    @Args('description') description: string | null,
  ) {
    const result = {
      name: name,
      description: description,
    };

    // todo insert table to db
    console.log('add table');

    this.pubSub.publish(SUBSCRIPTION_EVENTS.newTable, { newTable: result });

    return result;
  }

  @Subscription()
  newTable() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newTable);
  }
}
