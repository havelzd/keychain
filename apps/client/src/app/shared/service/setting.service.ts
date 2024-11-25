import { inject, Injectable } from "@angular/core";
import { IS_WEB_OR_TAURI } from "../tokens/platform.token";
import { SettingStorageStrategy, SETTING_STORAGE } from "./setting-storage-strategy";
import { configDir } from "@tauri-apps/api/path";

@Injectable({ providedIn: "root" })
export class SettingService {
  private readonly platformToken = inject(IS_WEB_OR_TAURI);
  private readonly settingStorage: SettingStorageStrategy = inject(SETTING_STORAGE);

  public init() {
    console.log("Inititalizing SettingService");
    console.log(this.platformToken);
    console.log(this.settingStorage);
    configDir().then(console.log);
  }
}
