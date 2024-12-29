import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AppearanceStore } from "../../../shared/store/setting/setting.store";
import { AppTheme, ThemeChoices } from "../../../shared/store/setting/setting.types";
import { NgClass } from "@angular/common";

@Component({
    selector: "app-appearance-setting",
    standalone: true,
    imports: [NgClass],
    templateUrl: "./appearance.component.html",
    styleUrl: "./appearance.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AppearanceStore],
})
export class AppearanceSettingComponent {
    private readonly settingStore = inject(AppearanceStore);

    protected readonly themeChoices = ThemeChoices;

    onSelect($event: Event): void {
        const radioButton = $event?.target as HTMLInputElement;
        const value = radioButton?.value as unknown as AppTheme;
        console.log(value);
        this.settingStore.setTheme(value);
    }
}
