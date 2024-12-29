import { LabeledValue } from "../../types";

export type AppTheme = "dark" | "light" | "light dark";

export const ThemeChoices: LabeledValue<AppTheme>[] = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "light dark", label: "System" },
];

export type AppearanceSetting = {
    theme: AppTheme;
};
