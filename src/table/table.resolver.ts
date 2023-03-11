import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JwtAuthGuard } from 'src/auth/gql-auth.guard';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { TableFilters } from './dto/query.input';
import { Table } from './entities/table.schema';
import { TableService } from './table.service';

enum SUBSCRIPTION_EVENTS {
  addedTable = 'addedTable',
  deletedTable = 'deletedTable',
}

@Resolver()
export class TableResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    private readonly tableService: TableService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Table])
  async tables(
    @Args('filters', { nullable: true }) filters?: TableFilters,
  ): Promise<Table[]> {
    return await this.tableService.findTables(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Table)
  async createTable(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string,
  ) {
    const newTable = await this.tableService.create({ name, description });
    this.pubSub.publish(SUBSCRIPTION_EVENTS.addedTable, {
      addedTable: newTable,
    });
    return newTable;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteTable(@Args('id') id: string) {
    const deletedTable = await this.tableService.deleteTable(id);
    if (deletedTable) {
      this.pubSub.publish(SUBSCRIPTION_EVENTS.deletedTable, {
        deletedTable: deletedTable,
      });
      return true;
    }
    return false;
  }

  @Subscription()
  addedTable() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.addedTable);
  }

  @Subscription()
  deletedTable() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.deletedTable);
  }
}
