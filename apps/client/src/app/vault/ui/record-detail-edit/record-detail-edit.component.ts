import { Component, input, output } from "@angular/core";
import { RecordItem, RecordTypeLabels } from "../../store/records/records.models";
import { FormsModule } from "@angular/forms";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: "app-record-detail-edit",
    standalone: true,
    imports: [FormsModule, FaIconComponent],
    templateUrl: "./record-detail-edit.component.html",
    styleUrl: "./record-detail-edit.component.scss",
})
export class RecordDetailEditComponent {
    record = input.required<RecordItem>();
    saved = output<RecordItem>();

    protected readonly recordTypeLabels = RecordTypeLabels;
    protected readonly recordTypeOpts = Object.entries(RecordTypeLabels);
    protected readonly faSave = faSave;

    protected saveRecord() {
        const record = this.record();
        if (record) {
            this.saved.emit(record);
        }
    }
}
