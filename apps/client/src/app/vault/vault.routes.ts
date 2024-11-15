import { Routes } from "@angular/router";
import { provideStore, provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import * as fromRecords from ".//store/records//records.reducer";
import { RecordsEffects } from ".//store/records//records.effects";
import { RecordsFacade } from ".//store/records//records.facade";

export const VAULT_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./feature/vault-shell/vault-shell.component").then(
        (c) => c.VaultShellComponent,
      ),
    providers: [
      RecordsFacade,
      provideState(fromRecords.RECORDS_FEATURE_KEY, fromRecords.recordsReducer),
      provideEffects(RecordsEffects),
    ],
  },
];
