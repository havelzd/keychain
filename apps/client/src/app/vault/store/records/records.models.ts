/**
 * Interface for the 'Records' data
 */
export type RecordEntity = (RecordGroup | RecordItem);

export interface RecordGroup {
  id: number;
  name: string;
  records: RecordEntity[];
}
export interface RecordItem {
  id: number; // Primary ID
  name: string;
  type: string;
}
