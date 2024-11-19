import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";

import * as RecordsActions from "./records.actions";
import { RecordItem, RecordEntity, RecordGroup } from "./records.models";

export const RECORDS_FEATURE_KEY = "records";

export interface RecordsState extends EntityState<RecordEntity> {
  selectedId?: string | number; // which Records record has been selected
  loaded: boolean; // has the Records list been loaded
  error?: string | null; // last known error (if any)
}

export interface RecordsPartialState {
  readonly [RECORDS_FEATURE_KEY]: RecordsState;
}

export const recordsAdapter: EntityAdapter<RecordEntity> = createEntityAdapter<RecordEntity>();

export const initialRecordsState: RecordsState = recordsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialRecordsState,
  on(RecordsActions.initRecords, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RecordsActions.loadRecordsSuccess, (state, { records }) =>
    recordsAdapter.setAll(records, { ...state, loaded: true }),
  ),
  on(RecordsActions.loadRecordsFailure, (state, { error }) => ({ ...state, error })),
  on(RecordsActions.createRecordGroup, (state, { parent  }) => {
    console.log("Parent", parent);
    const id = new Date().getTime();
    const newNode: RecordGroup = {
      id,
      name: "new",
      records: []
    };
    if (parent) {
      const update: Update<RecordEntity> = {
        id: parent.id,
        changes: {
          records: [...(parent?.records ?? []), newNode],
        },
      };
      return recordsAdapter.updateOne(update, state);
    } else {
      return recordsAdapter.addOne(newNode, state);
    }
  }),
);

export function recordsReducer(state: RecordsState | undefined, action: Action) {
  return reducer(state, action);
}
