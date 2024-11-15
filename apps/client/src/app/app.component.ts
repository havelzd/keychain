import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainMenuComponent } from "./shared/feature/main-menu/main-menu.component";

@Component({
  standalone: true,
  imports: [RouterModule, MainMenuComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "client";
}
