import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SETTING_SECTIONS } from "./setting-items";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-setting-list",
    standalone: true,
    imports: [CommonModule, FaIconComponent, RouterLink, RouterLinkActive],
    templateUrl: "./setting-list.component.html",
    styleUrl: "./setting-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingListComponent {
    protected readonly ITEMS = SETTING_SECTIONS;

    protected searchTerm = signal<string | undefined>(undefined);
    protected filteredItems = computed(() => {
        const term = this.searchTerm();
        if (!term) return this.ITEMS;
        return this.ITEMS.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));
    });
}
