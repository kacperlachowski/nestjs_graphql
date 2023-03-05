
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ColumnType {
    STRING_COLUMN = "STRING_COLUMN",
    NUMBER_COLUMN = "NUMBER_COLUMN",
    BOOLEAN_COLUMN = "BOOLEAN_COLUMN"
}

export class TableFilters {
    ids?: Nullable<Nullable<string>[]>;
    names?: Nullable<Nullable<string>[]>;
}

export class Table {
    _id: string;
    name: string;
    description?: Nullable<string>;
    columns: Nullable<Column>[];
    rows: Nullable<Row>[];
}

export class Column {
    _id: string;
    name: string;
    table: Table;
}

export class Row {
    _id: string;
    table: Table;
    values: string;
}

export abstract class IQuery {
    abstract tables(filters?: Nullable<TableFilters>): Nullable<Table>[] | Promise<Nullable<Table>[]>;

    abstract column(): Nullable<Nullable<Column>[]> | Promise<Nullable<Nullable<Column>[]>>;

    abstract row(): Nullable<Nullable<Row>[]> | Promise<Nullable<Nullable<Row>[]>>;
}

export abstract class IMutation {
    abstract createTable(name: string, description?: Nullable<string>): Nullable<Table> | Promise<Nullable<Table>>;

    abstract updateTable(id: string, name?: Nullable<string>, description?: Nullable<string>): Nullable<Table> | Promise<Nullable<Table>>;

    abstract deleteTable(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createColumn(tableId: string, name: string, type: ColumnType): Nullable<Column> | Promise<Nullable<Column>>;

    abstract updateColumn(id: string, name?: Nullable<string>, description?: Nullable<string>): Nullable<Column> | Promise<Nullable<Column>>;

    abstract deleteColumn(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createRow(tableId: string, values: string): Nullable<Row> | Promise<Nullable<Row>>;

    abstract deleteRow(id: string): Nullable<string> | Promise<Nullable<string>>;
}

export abstract class ISubscription {
    abstract addedTable(): Nullable<Table> | Promise<Nullable<Table>>;

    abstract deletedTable(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract addedColumn(): Nullable<Column> | Promise<Nullable<Column>>;

    abstract deletedColumn(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract addedRow(): Nullable<Row> | Promise<Nullable<Row>>;

    abstract deletedRow(): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
