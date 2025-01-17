import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { RecordEvent, RecordListComponent } from "../../ui/record-list/record-list.component";
import { RecordDetailComponent } from "../../ui/record-detail/record-detail.component";
import { RecordsStore } from "../../store/records/records.store";
import { RecordEntity, RecordGroup, RecordItem } from "../../store/records/records.models";
import { RecordGroupDetailComponent } from "../../ui/record-group-detail/record-group-detail.component";
import { isRecordGroup, isRecordItem } from "../../store/records/records.guards";

@Component({
    selector: "app-vault-shell",
    standalone: true,
    imports: [RecordListComponent, RecordDetailComponent, RecordGroupDetailComponent],
    templateUrl: "./vault-shell.component.html",
    styleUrl: "./vault-shell.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaultShellComponent {
    private readonly recordsStore = inject(RecordsStore);

    protected selectedRecord = this.recordsStore.selectedRecord;
    protected selectedRecordGroup = computed(() => {
        return isRecordGroup(this.selectedRecord())
            ? (this.selectedRecord() as RecordGroup)
            : undefined;
    });
    protected selectedRecordItem = computed(() => {
        return isRecordItem(this.selectedRecord())
            ? (this.selectedRecord() as RecordItem)
            : undefined;
    });
    protected readonly records = this.recordsStore.entities;

    onRecordCreated(selectedNode: RecordGroup | undefined) {
        this.recordsStore.createRecord(selectedNode);
    }

    onRecordGroupCreated(selectedNode: RecordEntity | undefined) {
        this.recordsStore.createRecordGroup(selectedNode);
    }

    onRecordRenamed(event: RecordEvent) {
        this.recordsStore.renameRecord(event.record, event.value);
    }

    onRecordRemoved(record: RecordEntity) {
        this.recordsStore.removeRecord(record);
    }

    onRecordSelected(item: RecordEntity) {
        this.recordsStore.selectItem(item);
    }

    onRecordSave(item: RecordItem) {
        this.recordsStore.updateRecord(item);
    }
}
