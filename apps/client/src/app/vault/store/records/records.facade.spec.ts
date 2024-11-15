import { NgModule } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule, Store } from "@ngrx/store";
import { readFirst } from "@nx/angular/testing";

import * as RecordsActions from "./records.actions";
import { RecordsEffects } from "./records.effects";
import { RecordsFacade } from "./records.facade";
import { RecordsEntity } from "./records.models";
import {
    RECORDS_FEATURE_KEY,
    RecordsState,
    initialRecordsState,
    recordsReducer,
} from "./records.reducer";
import * as RecordsSelectors from "./records.selectors";

interface TestSchema {
    records: RecordsState;
}

describe("RecordsFacade", () => {
    let facade: RecordsFacade;
    let store: Store<TestSchema>;
    const createRecordsEntity = (id: string, name = ""): RecordsEntity => ({
        id,
        name: name || `name-${id}`,
    });

    describe("used in NgModule", () => {
        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(RECORDS_FEATURE_KEY, recordsReducer),
                    EffectsModule.forFeature([RecordsEffects]),
                ],
                providers: [RecordsFacade],
            })
            class CustomFeatureModule {}

            @NgModule({
                imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
            })
            class RootModule {}
            TestBed.configureTestingModule({ imports: [RootModule] });

            store = TestBed.inject(Store);
            facade = TestBed.inject(RecordsFacade);
        });

        /**
         * The initially generated facade::loadAll() returns empty array
         */
        it("loadAll() should return empty list with loaded == true", async () => {
            let list = await readFirst(facade.allRecords$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            facade.init();

            list = await readFirst(facade.allRecords$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(true);
        });

        /**
         * Use `loadRecordsSuccess` to manually update list
         */
        it("allRecords$ should return the loaded list; and loaded flag == true", async () => {
            let list = await readFirst(facade.allRecords$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            store.dispatch(
                RecordsActions.loadRecordsSuccess({
                    records: [createRecordsEntity("AAA"), createRecordsEntity("BBB")],
                }),
            );

            list = await readFirst(facade.allRecords$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(2);
            expect(isLoaded).toBe(true);
        });
    });
});
