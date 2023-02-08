import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './schemas/table.schema';
import { TableResolver } from './table.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
  ],
  providers: [TableResolver],
})
export class TableModule {}
