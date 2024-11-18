import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, catchError, of } from "rxjs";
import * as RecordsActions from "./records.actions";

@Injectable()
export class RecordsEffects {
    private actions$ = inject(Actions);

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecordsActions.initRecords),
            switchMap(() =>
                of(
                    RecordsActions.loadRecordsSuccess({
                        records: [
                            {
                                id: 1,
                                name: "Test 1",
                                records: [
                                    {
                                        id: 8,
                                        name: "Child1",
                                        records: [
                                            { id: 10, name: "GrandChild1" },
                                            { id: 11, name: "GrandChild2" },
                                        ],
                                    },
                                    {
                                        id: 9,
                                        name: "Child2",
                                    },
                                ],
                            },
                            { id: 2, name: "Test 2", records: [] },
                            { id: 3, name: "Test 3", records: [] },
                            { id: 4, name: "Test 4", records: [] },
                            { id: 5, name: "Test 5", records: [] },
                            { id: 6, name: "Test 6", records: [] },
                            { id: 7, name: "Test 7", records: [] },
                        ],
                    }),
                ),
            ),
            catchError((error) => {
                console.error("Error", error);
                return of(RecordsActions.loadRecordsFailure({ error }));
            }),
        ),
    );
}
