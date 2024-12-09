import { Component, computed, inject, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordEntity, RecordGroup, RecordItem } from "../../store/records/records.models";
import { Clipboard } from "@angular/cdk/clipboard";
import { Popup } from "@keychain/ui";

@Component({
    selector: "app-record-group-detail",
    standalone: true,
    imports: [CommonModule],
    providers: [Clipboard, Popup],
    templateUrl: "./record-group-detail.component.html",
    styleUrl: "./record-group-detail.component.scss",
})
export class RecordGroupDetailComponent {
    recordGroup = input.required<RecordGroup | undefined>();

    clipboard = inject(Clipboard);
    popupService = inject(Popup);

    protected records = computed(() => {
        // flatten the records to get RecordItems[]
        const record = this.recordGroup();
        function flattenRecords(recordGroup: RecordEntity): RecordItem[] {
            if ("records" in recordGroup) {
                return [...recordGroup.records.flatMap(flattenRecords)];
            } else {
                return [recordGroup];
            }
        }
        return record?.records.flatMap(flattenRecords) ?? [];
    });

    protected copyToClipboard(event: MouseEvent, record: RecordItem) {
        event.preventDefault();
        event.stopPropagation();
        this.clipboard.copy(record.password);
        console.log("Copied to clipboard", record.password);
        this.popupService.showPopup({body: "Copied to clipboard"});
    }


}
