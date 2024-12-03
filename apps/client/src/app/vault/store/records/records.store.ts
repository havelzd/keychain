import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { addEntities, setEntity, updateEntity, withEntities } from "@ngrx/signals/entities";
import { RecordEntity, RecordGroup, RecordItem } from "./records.models";

const initialRecords: RecordEntity[] = [
  {
    id: 1,
    name: "Test 1",
    records: [
      {
        id: 8,
        name: "Child1",
        records: [
          { id: 10, name: "GrandChild1", type: "" },
          { id: 11, name: "GrandChild2", type: "" },
        ],
      },
      {
        id: 9,
        name: "Child2",
        type: "",
      },
    ],
  },
  { id: 2, name: "Test 2", records: [] },
  { id: 3, name: "Test 3", records: [] },
  { id: 4, name: "Test 4", records: [] },
  { id: 5, name: "Test 5", records: [] },
  { id: 6, name: "Test 6", records: [] },
  { id: 7, name: "Test 7", records: [] },
];

const initialState = {};
export const RecordsStore = signalStore(
  withState(initialState),
  withEntities<RecordEntity>(),
  withHooks({
    onInit: (store) => {
      patchState(store, addEntities(initialRecords));
    },
  }),
  withMethods((store) => ({
    createRecord: (parent: RecordGroup | undefined): void => {
      const newRecord: RecordItem = {
        id: new Date().getTime(),
        name: "New Record",
        type: "",
      };
      if (parent && "records" in parent) {
        parent.records.push(newRecord);
        patchState(store, setEntity(parent as RecordEntity));
      } else {
        patchState(store, setEntity(newRecord as RecordEntity));
      }
    },
    renameRecord: (record: RecordEntity, name: string): void => {
      patchState(store, updateEntity({ id: record.id, changes: { name: name } }));
    },
  })),
);
