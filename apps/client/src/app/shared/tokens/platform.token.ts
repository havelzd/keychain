import { InjectionToken, PLATFORM_ID } from "@angular/core";
import { isTauri } from "@tauri-apps/api/core";
import { inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export enum APP_PLATFORM {
    WEB, //0
    TAURI, // 1
    SERVER, // 2
}

export const IsWebOrTauri = new InjectionToken<APP_PLATFORM>("PLATFORM_TOKEN");

export const isWebOrTauriFactory = (platform = inject(PLATFORM_ID)) => {
    const isBrowser = isPlatformBrowser(platform);
    if (isBrowser) {
        return isTauri() ? APP_PLATFORM.TAURI : APP_PLATFORM.WEB;
    }
    return APP_PLATFORM.SERVER;
};
// isTauri() ? APP_PLATFORM.TAURI : APP_PLATFORM.WEB;
