import { Route } from "@angular/router";

export const ROUTES: Route[] = [
    {
        path: "",
        loadComponent: () =>
            import("./feature/about-shell/about-shell.component").then(
                (m) => m.AboutShellComponent,
            ),
    },
];
