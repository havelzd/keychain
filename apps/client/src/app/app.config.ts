import {
    APP_INITIALIZER,
    ApplicationConfig,
    provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { IS_WEB_OR_TAURI, IS_WEB_OR_TAURI_FACTORY } from "./shared/tokens/platform.token";
import { SettingService } from "./shared/service/setting.service";
import {
    SETTING_STORAGE,
    SettingStorageStrategyFactory,
} from "./shared/service/setting-storage-strategy";
import { provideClientHydration } from "@angular/platform-browser";

const initFactory = (settingService: SettingService) => {
    return () => {
        settingService.init();
    };
};

export const appConfig: ApplicationConfig = {
    providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),
        provideClientHydration(),
        provideExperimentalZonelessChangeDetection(),
        provideRouter(appRoutes),
        { provide: IS_WEB_OR_TAURI, useFactory: IS_WEB_OR_TAURI_FACTORY },
        { provide: SETTING_STORAGE, useFactory: SettingStorageStrategyFactory },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: initFactory,
            deps: [SettingService, SETTING_STORAGE],
        },
    ],
};
