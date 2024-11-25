import { Injectable } from "@angular/core";
import { AppSetting } from "../store/setting/setting.types";
import { SettingStorageStrategy } from "./setting-storage-strategy";

@Injectable()
export class FileSettingStorage implements SettingStorageStrategy {

  getStoredSettings(): AppSetting {
    throw new Error("Method not implemented.");
  }
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
