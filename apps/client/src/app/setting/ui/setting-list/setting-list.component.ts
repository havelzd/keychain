import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SETTING_SECTIONS } from "./setting-items";
import { RouterLink, RouterLinkActive,  } from "@angular/router";

@Component({
  selector: "app-setting-list",
  standalone: true,
  imports: [FaIconComponent, RouterLink, RouterLinkActive],
  templateUrl: "./setting-list.component.html",
  styleUrl: "./setting-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingListComponent {
  protected readonly ITEMS = SETTING_SECTIONS;
}
