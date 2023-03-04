import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColumnInput } from './dto/create.input';
import { ColumnQueryInput } from './dto/query.input';
import { UpdateColumnInput } from './dto/update.input';
import { Column } from './entities/column.schema';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name)
    private readonly columnModel: Model<Column>,
  ) {}

  async create(createColumnInput: CreateColumnInput) {
    const column = new this.columnModel(createColumnInput);
    return column.save();
  }

  async update(updateColumnInput: UpdateColumnInput): Promise<Column> {
    const column = await this.columnModel
      .findByIdAndUpdate(updateColumnInput.columnId, updateColumnInput, {
        new: true,
      })
      .exec();

    if (!column) {
      throw new Error(`Column with id ${updateColumnInput.columnId} not found`);
    }

    return column;
  }

  async delete(columnId: string): Promise<boolean> {
    const column = await this.columnModel.findByIdAndDelete(columnId).exec();
    return column !== null;
  }

  async get(ids: string[]) {
    return this.columnModel.find({ _id: { $in: ids } });
  }

  async findColumns(filters?: ColumnQueryInput): Promise<Column[]> {
    let query = this.columnModel.find();

    if (filters) {
      if (filters.names) {
        query = query.where('name').in(filters.names);
      }
      // if (filters.description) {
      //   query = query.where('description').equals(filters.description);
      // }
    }

    return await query.exec();
  }

  async findOneById(columnId: string): Promise<Column> {
    return this.columnModel.findById(columnId).exec();
  }
}
