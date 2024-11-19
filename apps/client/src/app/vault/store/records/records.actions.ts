import { createAction, props } from "@ngrx/store";
import { RecordItem, RecordGroup, RecordEntity } from "./records.models";

export const initRecords = createAction("[Records Page] Init");

export const loadRecordsSuccess = createAction(
  "[Records/API] Load Records Success",
  props<{ records: RecordEntity[] }>(),
);

export const loadRecordsFailure = createAction(
  "[Records/API] Load Records Failure",
  props<{ error: any }>(),
);

export const createRecordGroup = createAction(
  "[Records/API] Create Node",
  props<{ parent: RecordGroup | undefined }>(),
);
