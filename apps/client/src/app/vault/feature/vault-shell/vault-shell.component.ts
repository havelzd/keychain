import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RecordEvent, RecordListComponent } from "../../ui/record-list/record-list.component";
import { RecordEntity, RecordGroup } from "../../store/records/records.models";
import { RecordDetailComponent } from "../../ui/record-detail/record-detail.component";
import { RecordsStore } from "../../store/records/records.store";

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

  protected selectedRecord: RecordEntity | undefined = undefined;
  protected readonly records = this.recordsStore.entities;


  onNodeCreated(selectedNode: RecordGroup | undefined) {
    this.recordsStore.createRecord(selectedNode);
  }

  onNodeRenamed(event: RecordEvent) {
    this.recordsStore.renameRecord(event.record, event.value);
  }
}
