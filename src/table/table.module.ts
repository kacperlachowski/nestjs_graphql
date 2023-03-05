import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './entities/table.schema';
import { TableResolver } from './table.resolver';
import { TableService } from './table.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
  ],
  providers: [TableResolver, TableService],
  exports: [TableService],
})
export class TableModule {}
