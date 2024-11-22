import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  {
    path: "",
    loadComponent: () =>
      import("./feature/setting-shell.component").then((m) => m.SettingShellComponent),
    children: [
      {
        path: "appearance",
        loadComponent: () =>
          import("./feature/appearance/appearance.component").then(
            (c) => c.AppearanceSettingComponent,
          ),
      },
      {
        path: "**",
        redirectTo: "appearance",
      }
    ],
  },
];
