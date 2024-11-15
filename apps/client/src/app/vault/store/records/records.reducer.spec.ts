import { Action } from "@ngrx/store";

import * as RecordsActions from "./records.actions";
import { RecordsEntity } from "./records.models";
import { RecordsState, initialRecordsState, recordsReducer } from "./records.reducer";

describe("Records Reducer", () => {
    const createRecordsEntity = (id: string, name = ""): RecordsEntity => ({
        id,
        name: name || `name-${id}`,
    });

    describe("valid Records actions", () => {
        it("loadRecordsSuccess should return the list of known Records", () => {
            const records = [
                createRecordsEntity("PRODUCT-AAA"),
                createRecordsEntity("PRODUCT-zzz"),
            ];
            const action = RecordsActions.loadRecordsSuccess({ records });

            const result: RecordsState = recordsReducer(initialRecordsState, action);

            expect(result.loaded).toBe(true);
            expect(result.ids.length).toBe(2);
        });
    });

    describe("unknown action", () => {
        it("should return the previous state", () => {
            const action = {} as Action;

            const result = recordsReducer(initialRecordsState, action);

            expect(result).toBe(initialRecordsState);
        });
    });
});
