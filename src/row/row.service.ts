import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRowInput } from './dto/create.input';
import { RowQueryInput } from './dto/query.input';
import { Row } from './entities/row.schema';

@Injectable()
export class RowService {
  constructor(
    @InjectModel(Row.name)
    private readonly rowModel: Model<Row>,
  ) {}

  async create(createRowInput: CreateRowInput) {
    const row = new this.rowModel(createRowInput);
    return row.save().then((row) => row);
  }

  async delete(rowId: string): Promise<boolean> {
    const row = await this.rowModel.findByIdAndDelete(rowId).exec();
    return row !== null;
  }

  async get(ids: string[]) {
    return this.rowModel.find({ id: { $in: ids } });
  }

  async deleteAllTables(): Promise<boolean> {
    const result = await this.rowModel.deleteMany({}).exec();
    return result.deletedCount > 0;
  }

  async findRows(filters?: RowQueryInput): Promise<Row[]> {
    let query = this.rowModel.find();

    if (filters) {
      if (filters.names) {
        query = query.where('name').in(filters.names);
      }
    }

    query = query.sort({ createdAt: -1 });
    return await query.exec();
  }
}
