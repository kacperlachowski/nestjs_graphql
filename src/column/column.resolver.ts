import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JwtAuthGuard } from 'src/auth/gql-auth.guard';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { TableService } from 'src/table/table.service';
import { ColumnService } from './column.service';
import { ColumnType } from './dto/create.input';
import { ColumnQueryInput } from './dto/query.input';

enum SUBSCRIPTION_EVENTS {
  addedColumn = 'addedColumn',
  deletedColumn = 'deletedColumn',
  updatedColumn = 'updatedColumn',
}

@Resolver()
export class ColumnResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    private readonly columnService: ColumnService,
    private readonly tableService: TableService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  async column(@Args('filters') filters?: ColumnQueryInput) {
    // const table = await this.tableService.findOneById(filters.tableId);
    // const columnIds = table.columns.map((column) => column.id.toString());
    // return this.columnService.get(columnIds);
    const columns = await this.columnService.findColumns(filters);
    return columns;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation()
  async createColumn(
    @Args('tableId') tableId: string,
    @Args('name') name: string,
    @Args('type') type: ColumnType,
  ) {
    const table = await this.tableService.findOneById(tableId);
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    const newColumn = await this.columnService.create({ tableId, name, type });
    await this.tableService.addColumnToTable(tableId, newColumn.id.toString());
    this.pubSub.publish(SUBSCRIPTION_EVENTS.addedColumn, {
      addedColumn: {
        ...newColumn,
        table: {
          id: tableId,
        },
      },
    });
    return newColumn;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation()
  async updateColumn(
    @Args('columnId') columnId: string,
    @Args('name') name: string | null,
    @Args('description') description: string | null,
  ) {
    const column = await this.columnService.findOneById(columnId);
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    const updatedColumn = await this.columnService.update({
      columnId,
      name,
      description,
    });
    this.pubSub.publish(SUBSCRIPTION_EVENTS.updatedColumn, {
      updatedColumn: updatedColumn,
    });
    return updatedColumn;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteColumn(@Args('id') id: string) {
    const deletedColumn = await this.columnService.delete(id);
    if (deletedColumn) {
      this.pubSub.publish(SUBSCRIPTION_EVENTS.deletedColumn, {
        deletedColumn: deletedColumn,
      });
      return true;
    }
    return false;
  }

  @Subscription()
  async addedColumn() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.addedColumn);
  }

  @Subscription()
  async deletedColumn() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.deletedColumn);
  }
}
