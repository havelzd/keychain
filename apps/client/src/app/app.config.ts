import {
    APP_INITIALIZER,
    ApplicationConfig,
    inject,
    provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import {
    APP_PLATFORM,
    IsWebOrTauri,
    isWebOrTauriFactory,
} from "./shared/tokens/platform.token";
import { SettingService } from "./shared/service/setting.service";
import {
    BrowserStorageType,
    StorageStrategyFactory,
    StorageType,
} from "./shared/service/setting-storage-strategy";

const storageFactory = (platform: APP_PLATFORM = inject(IsWebOrTauri)) => {
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
        provideExperimentalZonelessChangeDetection(),
        provideRouter(appRoutes),
        { provide: IsWebOrTauri, useFactory: isWebOrTauriFactory },
        { provide: BrowserStorageType, useFactory: storageFactory, deps: [IsWebOrTauri] },
        { provide: StorageType, useFactory: StorageStrategyFactory },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: initFactory,
            deps: [SettingService, StorageType],
        },
    ],
};
