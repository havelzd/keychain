import { inject, InjectionToken } from "@angular/core";
import { APP_PLATFORM, IsWebOrTauri } from "../tokens/platform.token";
import { FileStorage } from "./file-setting-storage";
import { RemoteStorage } from "./remote-setting-storage";

export const StorageType = new InjectionToken<StorageStrategy>("SettingStorageStrategy");
export const BrowserStorageType = new InjectionToken<Storage>("BrowserStorageType");

export const StorageStrategyFactory = () => {
    const appPlatform: APP_PLATFORM = inject(IsWebOrTauri);
    if (appPlatform === APP_PLATFORM.TAURI) {
        return FileStorage;
    } else if (appPlatform === APP_PLATFORM.WEB) {
        return RemoteStorage;
    }

    throw new Error("Unknown platform " + appPlatform);
};

export interface StorageStrategy {
    get(key: string): string | null | Promise<string | null>;
    set(key: string, value: string): void;
    remove(key: string): void;
}
