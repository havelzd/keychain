import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  {
    path: "vault",
    loadChildren: () => import("./vault/vault.routes").then((r) => r.VAULT_ROUTES),
  },
  {
    path: "",
    redirectTo: "/vault",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/vault",
  },

];
