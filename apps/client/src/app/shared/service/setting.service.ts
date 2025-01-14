import { inject, Injectable, Renderer2 } from "@angular/core";
import { IS_WEB_OR_TAURI } from "../tokens/platform.token";
import { StorageStrategy, StorageType } from "./setting-storage-strategy";
import { configDir } from "@tauri-apps/api/path";

@Injectable({ providedIn: "root" })
export class SettingService {
    private readonly platformToken = inject(IS_WEB_OR_TAURI);
    private readonly settingStorage: StorageStrategy = inject(StorageType);
    // private readonly renderer = inject(Renderer2);

    public init() {
        console.log("Inititalizing SettingService");
        console.log(this.platformToken);
        console.log(this.settingStorage);
        // const theme = this.settingStorage.get("appearance.theme");
        // this.renderer.setStyle(document.querySelector("body"), "color-scheme", theme);
    }
}
