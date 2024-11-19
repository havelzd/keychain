import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MENU_ITEMS } from "./menu-items";

@Component({
    selector: "app-main-menu",
    standalone: true,
    imports: [],
    templateUrl: "./main-menu.component.html",
    styleUrl: "./main-menu.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
    protected readonly MENU_ITEMS = MENU_ITEMS;
    nothing() {
        console.log("Main Menu rerender");
    }
}
