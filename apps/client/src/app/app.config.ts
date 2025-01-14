import {
    APP_INITIALIZER,
    ApplicationConfig,
    inject,
    provideExperimentalZonelessChangeDetection,
    Renderer2,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import {
    APP_PLATFORM,
    IS_WEB_OR_TAURI,
    IS_WEB_OR_TAURI_FACTORY,
} from "./shared/tokens/platform.token";
import { SettingService } from "./shared/service/setting.service";
import {
    BrowserStorageType,
    StorageStrategyFactory,
    StorageType,
} from "./shared/service/setting-storage-strategy";
import { provideClientHydration } from "@angular/platform-browser";

const storageFactory = (platform: APP_PLATFORM = inject(IS_WEB_OR_TAURI)) => {
    return platform === APP_PLATFORM.WEB ? localStorage : null;
};

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
        { provide: BrowserStorageType, useFactory: storageFactory, deps: [IS_WEB_OR_TAURI] },
        { provide: StorageType, useFactory: StorageStrategyFactory },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: initFactory,
            deps: [SettingService, StorageType],
        },
    ],
};
