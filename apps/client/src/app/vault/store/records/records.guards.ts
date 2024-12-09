import { RecordEntity, RecordGroup, RecordItem } from "./records.models";

export const isRecordGroup = (
    recordGroup: RecordEntity | undefined,
): recordGroup is RecordGroup => {
    return recordGroup != null && "records" in recordGroup;
};

export const isRecordItem = (record: RecordEntity | undefined): record is RecordItem => {
    return record != null && !("records" in record);
};
