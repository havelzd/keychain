import { ChangeDetectionStrategy, Component, computed, DoCheck, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordEntity } from "../../store/records/records.models";
import { TreeComponent, StaticTreeDataSource } from "@keychain/ui";

@Component({
    selector: "app-record-list",
    standalone: true,
    imports: [CommonModule, TreeComponent],
    templateUrl: "./record-list.component.html",
    styleUrl: "./record-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordListComponent implements DoCheck {
    records = input.required<RecordEntity[] | null>();

    protected readonly hasChildren = (node: RecordEntity) =>
        node.records != null && node.records.length > 0;
    protected readonly getChildren = (node: RecordEntity) => node.records;
    protected readonly dataSource = computed(
        () => new StaticTreeDataSource(this.records() ?? [], this.hasChildren, this.getChildren),
    );

    ngDoCheck(): void {
        console.log("RecordList CD");
    }
}
