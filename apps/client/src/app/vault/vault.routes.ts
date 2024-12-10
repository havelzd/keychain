import { Routes } from "@angular/router";
import { RecordsStore } from "./store/records/records.store";

export const VAULT_ROUTES: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./feature/vault-shell/vault-shell.component").then(
                (c) => c.VaultShellComponent,
            ),
        providers: [RecordsStore],
    },
];
