import { inject, InjectionToken } from "@angular/core";
import { AppSetting } from "../store/setting/setting.types";
import { APP_PLATFORM, IS_WEB_OR_TAURI } from "../tokens/platform.token";
import { FileSettingStorage } from "./file-setting-storage";
import { RemoteSettingStorage } from "./remote-setting-storage";

export const SETTING_STORAGE = new InjectionToken<SettingStorageStrategy>("SettingStorageStrategy");

export const SettingStorageStrategyFactory = () => {
  const appPlatform: APP_PLATFORM = inject(IS_WEB_OR_TAURI);
  if (appPlatform === APP_PLATFORM.TAURI) {
    return FileSettingStorage;
  } else if (appPlatform === APP_PLATFORM.WEB) {
    return RemoteSettingStorage;
  }

  throw new Error("Unknown platform " + appPlatform);
};

export interface SettingStorageStrategy {
  getStoredSettings(): AppSetting;
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}
