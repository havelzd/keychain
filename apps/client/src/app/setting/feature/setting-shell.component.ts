import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SettingListComponent } from "../ui/setting-list/setting-list.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-setting-shell",
  standalone: true,
  imports: [SettingListComponent, RouterOutlet],
  templateUrl: "./setting-shell.component.html",
  styleUrl: "./setting-shell.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingShellComponent { }
