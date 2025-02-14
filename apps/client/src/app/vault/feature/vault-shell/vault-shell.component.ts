import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
    viewChild,
} from "@angular/core";
import { RecordListComponent } from "../../ui/record-list/record-list.component";
import { RecordDetailComponent } from "../../ui/record-detail/record-detail.component";
import { RecordsStore } from "../../store/records/records.store";
import { RecordEntity, RecordGroup, RecordItem } from "../../store/records/records.models";
import { RecordGroupDetailComponent } from "../../ui/record-group-detail/record-group-detail.component";
import { isRecordGroup, isRecordItem } from "../../store/records/records.guards";
import { HeaderService } from "../../../header/service/header.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
    private readonly headerService = inject(HeaderService);

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

    protected readonly listVisible = signal(false);

    protected readonly recordList = viewChild(RecordListComponent);

    private readonly menuToggledSubscription = this.headerService.menuToggleClicked$.pipe(takeUntilDestroyed()).subscribe({
        next: () => {
            this.listVisible.update((v) => !v);
            console.log("Menu Toggled", this.listVisible());
        },
    });

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
