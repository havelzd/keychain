import { Injectable } from "@angular/core";
import { StorageStrategy } from "./setting-storage-strategy";

@Injectable()
export class FileStorage implements StorageStrategy {
    get(key: string): string | null {
        return null;
    }
    set(key: string, value: string): void {
        console.log("SET")
    }
    remove(key: string): void {
        throw new Error("Method not implemented.");
    }
}
