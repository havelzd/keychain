import { InjectionToken } from "@angular/core";
import { isTauri } from "@tauri-apps/api/core";

export enum APP_PLATFORM {
    WEB, //0
    TAURI, // 1
}

export const IsWebOrTauri = new InjectionToken<APP_PLATFORM>("PLATFORM_TOKEN");

export const isWebOrTauriFactory = () => (isTauri() ? APP_PLATFORM.TAURI : APP_PLATFORM.WEB);
