import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    signal,
    viewChild,
    OnChanges,
    input,
    output,
    SimpleChanges,
} from "@angular/core";
import { CommonModule, NgStyle } from "@angular/common";
import { RecordEntity, RecordGroup, RecordItem, RecordTypeLabels } from "../../store/records/records.models";
import { TreeComponent, StaticTreeDataSource } from "@keychain/ui";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faFolder, faFolderOpen, faKey } from "@fortawesome/free-solid-svg-icons";

export type RecordEvent = {
    record: RecordEntity;
    value: string;
};

@Component({
    selector: "app-record-list",
    standalone: true,
    imports: [CommonModule, TreeComponent, NgStyle, FaIconComponent],
    templateUrl: "./record-list.component.html",
    styleUrl: "./record-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordListComponent implements OnChanges {
    records = input.required<RecordEntity[]>();
    selectedRecord = input<RecordEntity | undefined>();
    recordCreated = output<RecordGroup | undefined>();
    recordGroupCreated = output<RecordEntity | undefined>();
    recordRenamed = output<RecordEvent>();
    recordRemoved = output<RecordEntity>();
    recordSelected = output<RecordEntity>();

    // Tree
    protected readonly folderIcon = faFolder;
    protected readonly folderOpenIcon = faFolderOpen;
    protected readonly keyIcon = faKey;
    protected readonly trackBy = (_idx: number, value: RecordEntity) => value.id;
    // protected readonly treeTrackBy = (val: RecordEntity) => val.id;
    protected readonly hasChildren = (node: RecordEntity) =>
        "records" in node ? node?.records != null : false;
    protected readonly getChildren = (node: RecordEntity) =>
        "records" in node ? node?.records : [];
    protected readonly dataSource = new StaticTreeDataSource(
        [],
        this.hasChildren,
        this.getChildren,
        "id",
    );

    // Context menu
    protected contextMenu = viewChild<ElementRef<HTMLDivElement>>("contextMenu");
    protected showContextMenu = signal(false);
    protected menuXY = signal<[number, number]>([0, 0]);
    protected contextMenuHeight = 150;
    protected contextMenuNode: RecordEntity | undefined = undefined;

    // Events
    protected nodeRenaming = signal<RecordEntity | undefined>(undefined);
    protected renameInput = viewChild<ElementRef<HTMLInputElement>>("renameInput");

    ngOnChanges(changes: SimpleChanges) {
        console.log("SELECTED RECORD INP", this.selectedRecord());
        if (changes["records"]) {
            console.log(this.records());
            this.dataSource.nodes = this.records() ?? [];
        }
    }

    onContextMenu($event: MouseEvent | PointerEvent, node: RecordGroup | undefined) {
        $event.stopPropagation();
        $event.preventDefault();
        this.contextMenuNode = node;
        this.showContextMenu.update(() => true);
        this.contextMenu()?.nativeElement.focus();
        const viewportHeight = window.innerHeight;
        if ($event.clientY + this.contextMenuHeight > viewportHeight) {
            this.menuXY.set([$event.clientX + 10, viewportHeight - this.contextMenuHeight - 10]);
        } else {
            this.menuXY.set([$event.clientX + 10, $event.clientY]);
        }
    }

    @HostListener("document:mousedown", ["$event"])
    onDocumentClick(event: MouseEvent): void {
        if (
            this.contextMenu() &&
            !this.contextMenu()?.nativeElement?.contains(event.target as Node)
        ) {
            this.showContextMenu.set(false);
        }
    }

    toggleNode($event: Event, node: RecordItem) {
        $event.stopPropagation();
        this.dataSource.toggleNode(node);
        this.recordSelected.emit(node);
        this.selectRecord(node);
    }

    addNode() {
        if (this.contextMenuNode != null && "records" in this.contextMenuNode) {
            this.dataSource.toggleNode(this.contextMenuNode, true);
            this.recordCreated.emit(this.contextMenuNode);
        } else {
            this.recordCreated.emit(undefined);
        }
        this.closeContextMenu();
    }

    addRecordGroup() {
        if (this.contextMenuNode != null && "records" in this.contextMenuNode) {
            this.dataSource.toggleNode(this.contextMenuNode, true);
        }
        this.recordGroupCreated.emit(this.contextMenuNode);
        this.closeContextMenu();
    }

    renameNode($event: Event) {
        this.nodeRenaming.set(this.contextMenuNode);
        $event.stopPropagation();
        setTimeout(() => {
            if (this.renameInput() != null) {
                this.renameInput()?.nativeElement.focus();
            }
        });
        this.closeContextMenu();
    }

    cancelRename() {
        this.nodeRenaming.set(undefined);
    }

    completeRename() {
        const newName = this.renameInput()?.nativeElement.value;
        const node = this.nodeRenaming();
        if (node != null && newName) {
            this.recordRenamed.emit({ record: node, value: newName });
        }
        this.nodeRenaming.set(undefined);
    }

    removeNode() {
        if (this.contextMenuNode) {
            this.recordRemoved.emit(this.contextMenuNode);
        }
    }

    nothing() {
        console.log("RecordList rerender");
    }

    private closeContextMenu() {
        this.showContextMenu.set(false);
    }

    protected selectNode($event: MouseEvent, node: RecordEntity) {
        $event.stopPropagation();
        this.selectRecord(node);
    }

    private selectRecord(record: RecordEntity) {
        this.recordSelected.emit(record);
    }
}
