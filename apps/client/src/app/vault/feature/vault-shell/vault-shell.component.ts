import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RecordEvent, RecordListComponent } from "../../ui/record-list/record-list.component";
import { RecordDetailComponent } from "../../ui/record-detail/record-detail.component";
import { RecordsStore } from "../../store/records/records.store";
import { RecordEntity, RecordGroup, RecordItem } from "../../store/records/records.models";

@Component({
    selector: "app-vault-shell",
    standalone: true,
    imports: [AsyncPipe, RecordListComponent, RecordDetailComponent],
    templateUrl: "./vault-shell.component.html",
    styleUrl: "./vault-shell.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaultShellComponent {
    private readonly recordsStore = inject(RecordsStore);

    protected selectedRecord = this.recordsStore.selectedRecord;
    protected readonly records = this.recordsStore.entities;

    protected readonly dialog = viewChild<ElementRef<HTMLDialogElement>>("dialog");

    onRecordCreated(selectedNode: RecordGroup | undefined) {
        this.dialog()?.nativeElement.showModal();
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

    onRecordSelected(item: RecordItem) {
        this.recordsStore.selectItem(item);
    }
}
