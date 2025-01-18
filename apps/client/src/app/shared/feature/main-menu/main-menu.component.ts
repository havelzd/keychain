import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { MENU_ITEMS } from "./menu-items";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-main-menu",
    standalone: true,
    imports: [FaIconComponent, RouterLink, RouterLinkActive],
    templateUrl: "./main-menu.component.html",
    styleUrl: "./main-menu.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
    protected readonly MENU_ITEMS = MENU_ITEMS;

    protected readonly FA_BARS = faBars;

    protected menuExpanded = signal(false);

    nothing() {
        console.log("Main Menu rerender");
    }

    toggleMenu() {
        this.menuExpanded.update((v) => !v);
    }
}
