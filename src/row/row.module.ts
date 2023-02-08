import { Module } from '@nestjs/common';
import { RowResolver } from './row.resolver';

@Module({
  providers: [RowResolver],
})
export class RowModule {}
