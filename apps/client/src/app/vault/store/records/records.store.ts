import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import {
    addEntities,
    removeEntity,
    setEntity,
    updateEntity,
    withEntities,
} from "@ngrx/signals/entities";
import { RecordEntity, RecordGroup, RecordItem, RecordType } from "./records.models";

const initialRecords: RecordEntity[] = [
    {
        id: 1,
        name: "Test 1",
        description:
            "This is a group for personal stuff and let's say it's a bit longer description" +
            " and I mean it's reeeeeeeaaaaaaaaaaaaallllyyy long",
        records: [
            {
                id: 8,
                name: "Child1",
                records: [
                    {
                        id: 10,
                        name: "GrandChild1",
                        type: RecordType.LOGIN,
                        description: "",
                        username: "user",
                        password: "user",
                        createdOn: new Date("2024-01-01"),
                    },
                    {
                        id: 11,
                        name: "GrandChild1",
                        type: RecordType.LOGIN,
                        description: "",
                        username: "user",
                        password: "user",
                        createdOn: new Date("2024-01-01"),
                    },
                ],
            },
            {
                id: 9,
                name: "GrandChild1",
                type: RecordType.LOGIN,
                description: "",
                username: "user",
                password: "user",
                createdOn: new Date("2024-01-01"),
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

type RecordsState = {
    selectedRecord: RecordEntity | undefined;
};

const initialState: RecordsState = {
    selectedRecord: undefined,
};
export const RecordsStore = signalStore(
    withState(initialState),
    withEntities<RecordEntity>(),
    withHooks({
        onInit: (store) => {
            patchState(store, addEntities(initialRecords));
            patchState(store, {
                selectedRecord: {
                    id: 10,
                    name: "GrandChild1",
                    type: RecordType.LOGIN,
                    description: "",
                    username: "user",
                    password: "user",
                    createdOn: new Date("2024-01-01"),
                },
            });
        },
    }),
    withMethods((store) => ({
        createRecord: (parent: RecordGroup | undefined): RecordItem => {
            const newRecord: RecordItem = {
                id: new Date().getTime(),
                name: "New Record",
                type: RecordType.LOGIN,
                description: "",
                username: "ads",
                password: "asda",
                createdOn: new Date("2024-01-01"),
            };
            if (parent && "records" in parent) {
                parent.records.push(newRecord);
                patchState(store, setEntity(parent as RecordEntity));
            } else {
                patchState(store, setEntity(newRecord as RecordEntity));
            }
            patchState(store, { selectedRecord: newRecord });
            return newRecord;
        },
        renameRecord: (record: RecordEntity, name: string): void => {
            patchState(store, updateEntity({ id: record.id, changes: { name } }));
        },
        createRecordGroup(parent: RecordEntity | undefined): RecordGroup {
            const recordGroup: RecordGroup = {
                id: new Date().getTime(),
                name: "New Record Group",
                records: [],
            };
            if (parent && "records" in parent) {
                parent.records.push(recordGroup);
                patchState(store, setEntity(parent as RecordEntity));
            } else {
                patchState(store, setEntity(recordGroup as RecordEntity));
            }
            return recordGroup;
        },
        removeRecord(record: RecordEntity): void {
            patchState(store, removeEntity(record.id));
        },
        selectItem(record: RecordEntity): void {
            patchState(store, { selectedRecord: record });
        },
        updateRecord(record: RecordEntity): void {
            patchState(store, updateEntity({ id: record.id, changes: record }));
            patchState(store, { selectedRecord: record });
            console.log(record);
        },
    })),
);
