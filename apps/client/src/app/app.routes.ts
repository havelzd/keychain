import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    {
        path: "vault",
        loadChildren: () => import("./vault/vault.routes").then((r) => r.VAULT_ROUTES),
    },
    {
        path: "settings",
        loadChildren: () => import("./setting/setting.routes").then((r) => r.ROUTES),
    },
    {
        path: "about",
        loadChildren: () => import("./about/about.routes").then((r) => r.ROUTES),
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
