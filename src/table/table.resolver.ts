import { Inject } from '@nestjs/common';
import { Args, Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Column, Row, Table } from 'src/schema/graphql';

enum SUBSCRIPTION_EVENTS {
  newTable = 'newTable',
  newColumn = 'newColumn',
  newRow = 'newRow',
}

@Resolver()
export class TableResolver {
  tables: Table[] = [];
  columns: Column[] = [];
  rows: Row[] = [];

  getTable(tableId: number): Table | null {
    const table = this.tables.find((item) => item.id === tableId);
    return table ?? null;
  }

  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}

  @Query()
  table() {
    return this.tables;
  }

  @Query()
  column() {
    return this.columns;
  }

  @Query()
  row() {
    return this.rows;
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

  @Mutation()
  addColumn(@Args('name') name: string, @Args('tableId') tableId: number) {
    const result: Partial<Column> = {
      id: this.columns.length + 1,
      name,
    };

    const table = this.getTable(tableId);
    if (table) {
      result.id = tableId;
    } else {
      throw new GraphQLError('Invalid argument value', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    this.pubSub.publish(SUBSCRIPTION_EVENTS.newColumn, { newColumn: result });

    return result;
  }

  @Mutation()
  addRow(@Args('values') values: string, @Args('tableId') tableId: number) {
    const result: Partial<Row> = {};

    const table = this.getTable(tableId);
    if (table) {
      result.id = tableId;
    } else {
      throw new GraphQLError('Invalid argument value', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    try {
      const rowValues = JSON.parse(values);

      if (rowValues) {
        result.values = values;
      } else {
        throw new GraphQLError('Invalid argument value', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    } catch {
      throw new GraphQLError('Invalid argument value', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    this.pubSub.publish(SUBSCRIPTION_EVENTS.newRow, { newRow: result });

    return result;
  }

  @Subscription()
  newTable() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newTable);
  }

  @Subscription()
  newColumn() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newColumn);
  }

  @Subscription()
  newRow() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newRow);
  }
}
