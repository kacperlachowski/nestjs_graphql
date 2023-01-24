import { Module } from '@nestjs/common';
import { TableResolver } from './table.resolver';

@Module({
  providers: [TableResolver],
})
export class TableModule {}
