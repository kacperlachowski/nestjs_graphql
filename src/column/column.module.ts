import { Module } from '@nestjs/common';
import { ColumnResolver } from './column.resolver';

@Module({
  providers: [ColumnResolver],
})
export class ColumnModule {}
