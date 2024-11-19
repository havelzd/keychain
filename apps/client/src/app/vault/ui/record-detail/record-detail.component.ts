import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordEntity } from "../../store/records/records.models";

@Component({
  selector: "app-record-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./record-detail.component.html",
  styleUrl: "./record-detail.component.scss",
})
export class RecordDetailComponent {
  record = input.required<RecordEntity | undefined>();
}
