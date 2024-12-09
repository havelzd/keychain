/**
 * Interface for the 'Records' data
 */
export enum RecordType {
    LOGIN,
}

export type RecordItem = LoginRecord;
export type RecordEntity = RecordGroup | RecordItem;

interface RecordEntityBase {
    id: number;
    name: string;
    description?: string;
}
export interface RecordGroup extends RecordEntityBase {
    records: RecordEntity[];
}

export interface Record extends RecordEntityBase {
    type: RecordType;
}

export interface LoginRecord extends Record {
    type: RecordType.LOGIN;
    username: string;
    password: string;
}
