import { InjectionToken } from "@angular/core";
import { isTauri } from "@tauri-apps/api/core";

export enum APP_PLATFORM {
    WEB, //0
    TAURI, // 1
}

export const IS_WEB_OR_TAURI = new InjectionToken<APP_PLATFORM>("PLATFORM_TOKEN");

export const IS_WEB_OR_TAURI_FACTORY = () => (isTauri() ? APP_PLATFORM.TAURI : APP_PLATFORM.WEB);
