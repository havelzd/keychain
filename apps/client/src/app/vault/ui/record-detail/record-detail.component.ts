import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordItem } from "../../store/records/records.models";

@Component({
    selector: "app-record-detail",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./record-detail.component.html",
    styleUrl: "./record-detail.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordDetailComponent {
    record = input.required<RecordItem | undefined>();
}
