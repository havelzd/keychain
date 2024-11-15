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
                            { id: 1, name: "Test 1" },
                            { id: 2, name: "Test 2" },
                            { id: 3, name: "Test 3" },
                            { id: 4, name: "Test 4" },
                            { id: 5, name: "Test 5" },
                            { id: 6, name: "Test 6" },
                            { id: 7, name: "Test 7" },
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
