import { ChangeDetectionStrategy, Component, DoCheck, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RecordsFacade } from "../../store/records/records.facade";
import { RecordListComponent } from "../../ui/record-list/record-list.component";

@Component({
    selector: "app-vault-shell",
    standalone: true,
    imports: [AsyncPipe, RecordListComponent],
    templateUrl: "./vault-shell.component.html",
    styleUrl: "./vault-shell.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaultShellComponent implements OnInit, DoCheck {
    private readonly recordsFacade = inject(RecordsFacade);

    protected readonly records$ = this.recordsFacade.allRecords$;

    ngOnInit() {
        this.recordsFacade.init();
    }

    ngDoCheck() {
        console.log("Shell CD");
    }
}
