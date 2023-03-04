import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableModule } from 'src/table/table.module';
import { ColumnResolver } from './column.resolver';
import { ColumnService } from './column.service';
import { Column, ColumnSchema } from './entities/column.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
    TableModule,
  ],
  providers: [ColumnService, ColumnResolver],
})
export class ColumnModule {}
