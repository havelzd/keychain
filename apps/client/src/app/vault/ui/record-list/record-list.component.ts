import { ChangeDetectionStrategy, Component, DoCheck, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordEntity } from "../../store/records/records.models";

@Component({
    selector: "app-record-list",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./record-list.component.html",
    styleUrl: "./record-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordListComponent implements DoCheck {
  records = input.required<RecordEntity[] | null>();

  ngDoCheck(): void {
      console.log("RecordList CD");
  }
}
