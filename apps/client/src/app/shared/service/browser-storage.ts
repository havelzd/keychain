import { inject } from "@angular/core";
import { BrowserStorageType, StorageStrategy } from "./setting-storage-strategy";

export class BrowserStorage implements StorageStrategy {
    private readonly storage: Storage = inject(BrowserStorageType);

    get(key: string): string | null | Promise<string | null> {
        return this.storage.getItem(key);
    }

    set(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    remove(key: string): void {
        this.storage.removeItem(key);
    }
}
