import { signalStore, withMethods, withState } from "@ngrx/signals";
import { AppSetting } from "./setting.types";

const initialState: AppSetting = {
    appearance: {
        theme: "system",
    },
};
export const SettingStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        setTheme: (theme: AppSetting["appearance"]["theme"]) => {
            // patchState(store, (state) => ({}))
        },
    })),
);
