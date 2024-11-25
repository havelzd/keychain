import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-appearance-setting",
  standalone: true,
  imports: [],
  templateUrl: "./appearance.component.html",
  styleUrl: "./appearance.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceSettingComponent {

  onSelect($event: Event): void {
    console.log($event);
    const radioButton = $event?.target as HTMLInputElement;
    const value = radioButton?.value;
    console.log(value);
  }
}
