import { Injectable, inject } from "@angular/core";
import { select, Store, Action } from "@ngrx/store";

import * as RecordsActions from "./records.actions";
import * as RecordsFeature from "./records.reducer";
import * as RecordsSelectors from "./records.selectors";
import { filter, tap } from "rxjs/operators";
import { notNull } from "../../../shared/utils/operators";

@Injectable()
export class RecordsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(RecordsSelectors.selectRecordsLoaded));
  allRecords$ = this.store.pipe(
    select(RecordsSelectors.selectAllRecords),
    filter(notNull),
    tap((value) => console.log("workspaces", value)),
  );
  selectedRecords$ = this.store.pipe(select(RecordsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(RecordsActions.initRecords());
  }
}
