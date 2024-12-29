import { signalStore, withMethods, withState, patchState } from "@ngrx/signals";
import { AppearanceSetting, AppTheme } from "./setting.types";
import { inject, Renderer2 } from "@angular/core";
import { StorageStrategy, StorageType } from "../../service/setting-storage-strategy";

const initialState: AppearanceSetting = {
    theme: "light dark",
};
export const AppearanceStore = signalStore(
    { providedIn: "root" },
    withState(initialState),
    withMethods(
        (store, renderer = inject(Renderer2), storage: StorageStrategy = inject(StorageType)) => ({
            setTheme: (theme: AppTheme) => {
                console.log("Setting theme to", theme);
                patchState(store, (state) => ({ ...state, appearance: { theme } }));
                const element = document.querySelector("body");
                console.log(element);
                renderer.setStyle(element, "color-scheme", theme);
                console.log(storage);
                storage.set("appearance.theme", theme);
            },
        }),
    ),
);
