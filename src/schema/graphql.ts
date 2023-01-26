
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Table {
    id: number;
    name: string;
    description?: Nullable<string>;
    columns?: Nullable<Nullable<Column>[]>;
    rows?: Nullable<Nullable<Row>[]>;
}

export class Column {
    id: number;
    name: string;
    table: Table;
}

export class Row {
    id: number;
    table: Table;
    values: string;
}

export abstract class IQuery {
    abstract table(): Nullable<Nullable<Table>[]> | Promise<Nullable<Nullable<Table>[]>>;

    abstract column(): Nullable<Nullable<Column>[]> | Promise<Nullable<Nullable<Column>[]>>;

    abstract row(): Nullable<Nullable<Row>[]> | Promise<Nullable<Nullable<Row>[]>>;
}

export abstract class IMutation {
    abstract addTable(name: string, description?: Nullable<string>): Nullable<Table> | Promise<Nullable<Table>>;

    abstract addColumn(name: string, tableId: number): Nullable<Column> | Promise<Nullable<Column>>;

    abstract addRow(values: string, tableId: number): Nullable<Row> | Promise<Nullable<Row>>;
}

export abstract class ISubscription {
    abstract newTable(): Nullable<Table> | Promise<Nullable<Table>>;

    abstract newColumn(): Nullable<Column> | Promise<Nullable<Column>>;

    abstract newRow(): Nullable<Row> | Promise<Nullable<Row>>;
}

type Nullable<T> = T | null;
