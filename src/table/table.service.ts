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
    return table.save().then((savedTable) => ({
      ...savedTable.toObject(),
      id: savedTable._id.toString(),
    }));
  }

  async updateTable(
    tableId: string,
    updateTableInput: Partial<CreateTableInput>,
  ): Promise<Table> {
    const table = await this.tableModel
      .findByIdAndUpdate(tableId, updateTableInput, { new: true })
      .exec();
    return table;
  }

  async deleteAllTables(): Promise<boolean> {
    const result = await this.tableModel.deleteMany({}).exec();
    return result.deletedCount > 0;
  }

  async deleteTable(tableId: string): Promise<boolean> {
    const table = await this.tableModel.findByIdAndDelete(tableId).exec();
    return table !== null;
  }

  async countTables(filters?: TableFilters): Promise<number> {
    let query = this.tableModel.find();

    if (filters) {
      if (filters.name) {
        query = query.where('name').in(filters.name);
      }
      if (filters.description) {
        query = query.where('description').equals(filters.description);
      }
    }

    return query.countDocuments().exec();
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

      if (filters.search) {
        const searchRegex = new RegExp(`^${filters.search}`, 'i');
        query = query.where('name').regex(searchRegex);
      }

      if (typeof filters.first === 'number') {
        query = query.limit(filters.first);
      }

      if (typeof filters.offset === 'number') {
        query = query.skip(filters.offset);
      }
    }

    query = query.sort({ createdAt: -1 });
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
