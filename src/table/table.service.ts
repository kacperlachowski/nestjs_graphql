import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTableInput } from './dto/create.input';
import { TableFilters } from './dto/query.input';
import { Table } from './entities/table.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name)
    private readonly tableModel: Model<Table>,
  ) {}

  create(createTableInput: CreateTableInput) {
    const table = new this.tableModel(createTableInput);
    return table.save();
  }

  async deleteTable(tableId: string): Promise<boolean> {
    const table = await this.tableModel.findByIdAndDelete(tableId).exec();
    return table !== null;
  }

  async findTables(filters?: TableFilters): Promise<Table[]> {
    let query = this.tableModel.find();

    if (filters) {
      if (filters.name) {
        query = query.where('name').in(filters.name);
      }
      if (filters.description) {
        query = query.where('description').equals(filters.description);
      }
    }

    query = query.populate('columns');
    query = query.populate('rows');

    return await query.exec();
  }

  async addColumnToTable(tableId: string, columnId: string): Promise<Table> {
    const table = await this.tableModel
      .findByIdAndUpdate(
        tableId,
        { $addToSet: { columns: columnId } },
        { new: true },
      )
      .populate('columns')
      .exec();
    return table;
  }

  async addRowToTable(tableId: string, rowId: string): Promise<Table> {
    const table = await this.tableModel
      .findByIdAndUpdate(tableId, { $addToSet: { rows: rowId } }, { new: true })
      .populate('rows')
      .exec();
    return table;
  }

  async findOneById(tableId: string): Promise<Table> {
    return this.tableModel.findById(tableId).exec();
  }
}
