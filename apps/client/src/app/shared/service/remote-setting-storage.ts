import { StorageStrategy } from "./setting-storage-strategy";

export class RemoteStorage implements StorageStrategy {
    get(key: string): string | null {
        return window.sessionStorage.getItem(key);
    }

    set(key: string, value: string): void {
        throw new Error("Method not implemented.");
    }

    remove(key: string): void {
        throw new Error("Method not implemented.");
    }
}
