import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RowResolver } from './row.resolver';
import { Row, RowSchema } from './entities/row.schema';
import { TableModule } from 'src/table/table.module';
import { RowService } from './row.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Row.name, schema: RowSchema }]),
    TableModule,
  ],
  providers: [RowResolver, RowService],
})
export class RowModule {}
