
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
}

export abstract class IQuery {
    abstract table(): Nullable<Nullable<Table>[]> | Promise<Nullable<Nullable<Table>[]>>;
}

export abstract class IMutation {
    abstract addTable(name: string, description?: Nullable<string>): Nullable<Table> | Promise<Nullable<Table>>;
}

export abstract class ISubscription {
    abstract newTable(): Nullable<Table> | Promise<Nullable<Table>>;
}

type Nullable<T> = T | null;
