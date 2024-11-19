import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RecordsFacade } from "../../store/records/records.facade";
import { RecordListComponent } from "../../ui/record-list/record-list.component";
import { RecordGroup } from "../../store/records/records.models";
import { tap } from "rxjs";

@Component({
  selector: "app-vault-shell",
  standalone: true,
  imports: [AsyncPipe, RecordListComponent],
  templateUrl: "./vault-shell.component.html",
  styleUrl: "./vault-shell.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaultShellComponent implements OnInit {
  private readonly recordsFacade = inject(RecordsFacade);

  protected readonly records$ = this.recordsFacade.allRecords$.pipe(tap(console.log));

  ngOnInit() {
    this.recordsFacade.init();
  }

  onNodeCreated(selectedNode: RecordGroup | undefined) {
    this.recordsFacade.createNode(selectedNode);
  }
}
