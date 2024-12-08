import {
    APP_INITIALIZER,
    ApplicationConfig,
    provideExperimentalZonelessChangeDetection,
    provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { IS_WEB_OR_TAURI, IS_WEB_OR_TAURI_FACTORY } from "./shared/tokens/platform.token";
import { SettingService } from "./shared/service/setting.service";
import {
    SETTING_STORAGE,
    SettingStorageStrategyFactory,
} from "./shared/service/setting-storage-strategy";

const initfactory = (settingService: SettingService) => {
    return () => {
        settingService.init();
    };
};

export const appConfig: ApplicationConfig = {
    providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),
        provideExperimentalZonelessChangeDetection(),
        provideRouter(appRoutes),
        // provideStore(),
        // provideEffects(),
        { provide: IS_WEB_OR_TAURI, useFactory: IS_WEB_OR_TAURI_FACTORY },
        { provide: SETTING_STORAGE, useFactory: SettingStorageStrategyFactory },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: initfactory,
            deps: [SettingService, SETTING_STORAGE],
        },
    ],
};
