
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
    first?: Nullable<number>;
    offset?: Nullable<number>;
    ids?: Nullable<Nullable<string>[]>;
    names?: Nullable<Nullable<string>[]>;
    search?: Nullable<string>;
}

export class TableFiltersFindOne {
    id: string;
}

export class ColumnFilters {
    tableId?: Nullable<string>;
}

export class AuthResponse {
    user?: Nullable<User>;
    token?: Nullable<string>;
}

export class User {
    id: string;
    username: string;
}

export class Table {
    id: string;
    name: string;
    description?: Nullable<string>;
    columns: Nullable<Column>[];
    rows: Nullable<Row>[];
}

export class UpdatedTable {
    id?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class Column {
    id: string;
    name: string;
    table: Table;
    type: ColumnType;
}

export class Row {
    id: string;
    table: Table;
    values: string;
}

export abstract class IQuery {
    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract tables(filters?: Nullable<TableFilters>): Nullable<Table>[] | Promise<Nullable<Table>[]>;

    abstract table(filters: TableFiltersFindOne): Nullable<Table> | Promise<Nullable<Table>>;

    abstract tableCount(filters?: Nullable<TableFilters>): number | Promise<number>;

    abstract column(filters?: Nullable<ColumnFilters>): Nullable<Column>[] | Promise<Nullable<Column>[]>;

    abstract row(): Nullable<Row>[] | Promise<Nullable<Row>[]>;
}

export abstract class IMutation {
    abstract signup(username: string, password: string): AuthResponse | Promise<AuthResponse>;

    abstract login(username: string, password: string): AuthResponse | Promise<AuthResponse>;

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
    abstract addedTable(): Table | Promise<Table>;

    abstract updatedTable(): Nullable<UpdatedTable> | Promise<Nullable<UpdatedTable>>;

    abstract deletedTable(): string | Promise<string>;

    abstract addedColumn(): Column | Promise<Column>;

    abstract deletedColumn(): boolean | Promise<boolean>;

    abstract addedRow(): Row | Promise<Row>;

    abstract deletedRow(): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
