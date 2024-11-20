import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/setting-shell.component").then((m) => m.SettingShellComponent),
  },
];
