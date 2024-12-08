/**
 * Interface for the 'Records' data
 */
export enum RecordType {
    LOGIN,
}

export type RecordItem = LoginRecord
export type RecordEntity = RecordGroup | RecordItem;

export interface RecordGroup {
    id: number;
    name: string;
    records: RecordEntity[];
}

export interface Record {
    id: number; // Primary ID
    name: string;
    description?: string;
}

export interface LoginRecord extends Record {
    type: RecordType.LOGIN,
    username: string;
    password: string;
}
