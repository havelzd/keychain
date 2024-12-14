/**
 * Interface for the 'Records' data
 */
export enum RecordType {
    LOGIN,
}

type RecordTypeEnumMap = {
    [key in RecordType]: string;
};

export const RecordTypeLabels: RecordTypeEnumMap = {
    [RecordType.LOGIN]: "Login",
};

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

export interface AbstractRecordType extends RecordEntityBase {
    type: RecordType;
    createdOn: Date | number;
}

export interface LoginRecord extends AbstractRecordType {
    type: RecordType.LOGIN;
    username: string;
    password: string;
}
