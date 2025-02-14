import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { HeaderService } from "../service/header.service";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: "app-header",
    imports: [FaIconComponent],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    private readonly headerService = inject(HeaderService);

    protected readonly title = this.headerService.title;

    protected readonly faBars = faBars;
    protected readonly faMagnifyingGlass = faMagnifyingGlass;

    protected toggleMenu() {
        console.log("Toggle Menu");
        this.headerService.toggleMenu();
    }
}
