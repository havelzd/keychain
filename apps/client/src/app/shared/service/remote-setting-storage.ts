import { StorageStrategy } from "./setting-storage-strategy";

export class RemoteStorage implements StorageStrategy {
    get(key: string): string | null {
        throw new Error("Method not implemented.");
    }
    set(key: string, value: string): void {
        throw new Error("Method not implemented.");
    }
    remove(key: string): void {
        throw new Error("Method not implemented.");
    }
}
