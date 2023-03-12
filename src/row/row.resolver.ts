import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { TableService } from 'src/table/table.service';
import { RowService } from './row.service';
import { RowQueryInput } from './dto/query.input';
import { JwtAuthGuard } from 'src/auth/gql-auth.guard';

enum SUBSCRIPTION_EVENTS {
  addedRow = 'addedRow',
  deletedRow = 'deletedRow',
}

@Resolver()
export class RowResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    private readonly rowService: RowService,
    private readonly tableService: TableService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  async row(@Args('filters') filters?: RowQueryInput) {
    const rows = await this.rowService.findRows(filters);
    return rows;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation()
  async createRow(
    @Args('tableId') tableId: string,
    @Args('values') values: string,
  ) {
    const table = await this.tableService.findOneById(tableId);
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    const newRow = await this.rowService.create({
      tableId,
      values: JSON.parse(values),
    });
    await this.tableService.addRowToTable(tableId, newRow.id.toString());
    this.pubSub.publish(SUBSCRIPTION_EVENTS.addedRow, {
      addedRow: newRow,
    });
    return newRow;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteRow(@Args('id') id: string) {
    const deletedRow = await this.rowService.delete(id);
    if (deletedRow) {
      this.pubSub.publish(SUBSCRIPTION_EVENTS.deletedRow, {
        deletedRow: deletedRow,
      });
      return true;
    }
    return false;
  }

  @Subscription()
  addedRow() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.addedRow);
  }

  @Subscription()
  deletedRow() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.deletedRow);
  }
}
