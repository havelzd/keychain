import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    signal,
    viewChild,
    inject,
} from "@angular/core";
import { NgStyle, NgTemplateOutlet } from "@angular/common";
import { RecordEntity, RecordGroup, RecordItem } from "../../store/records/records.models";
import { TreeComponent, StaticTreeDataSource } from "@keychain/ui";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import {
    faFolder,
    faFolderOpen,
    faKey,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { RecordsStore } from "../../store/records/records.store";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

export type RecordEvent = {
    record: RecordEntity;
    value: string;
};

@Component({
    selector: "app-record-list",
    standalone: true,
    imports: [NgTemplateOutlet, TreeComponent, NgStyle, FaIconComponent],
    templateUrl: "./record-list.component.html",
    styleUrl: "./record-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordListComponent {
    /** Records store */
    private readonly recordsStore = inject(RecordsStore);

    /** List of available records */
    private readonly records = this.recordsStore.entities;

    protected readonly selectedRecord = this.recordsStore.selectedRecord;

    /** Search icon */
    protected readonly faMagnifyingGlass = faMagnifyingGlass;

    /** Tree root node toggle collapsed icon */
    protected readonly folderIcon = faFolder;

    /** Tree root node toggle opened icon */
    protected readonly folderOpenIcon = faFolderOpen;

    /** Tree leaf node icon */
    protected readonly keyIcon = faKey;

    /** Node trackBy function required by TreeDataSource */
    protected readonly trackBy = (_idx: number, value: RecordEntity) => value.id;

    /** hasChildren function indicating wheter node is root */
    protected readonly hasChildren = (node: RecordEntity) =>
        "records" in node ? node?.records != null : false;

    /** getChildren function retrieving nodes children */
    protected readonly getChildren = (node: RecordEntity) =>
        "records" in node ? node?.records : [];

    /** TreeDataSource */
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

    private readonly recordSubscription = toObservable(this.records)
        .pipe(takeUntilDestroyed())
        .subscribe({
            next: (records) => (this.dataSource.nodes = records ?? []),
        });

    // ngOnChanges(changes: SimpleChanges) {
    //     if (changes["records"]) {
    //         this.dataSource.nodes = this.records() ?? [];
    //     }
    // }

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
    protected onDocumentClick(event: MouseEvent): void {
        if (
            this.contextMenu() &&
            !this.contextMenu()?.nativeElement?.contains(event.target as Node)
        ) {
            this.showContextMenu.set(false);
        }
    }

    protected toggleNode($event: Event, node: RecordItem) {
        $event.stopPropagation();
        this.dataSource.toggleNode(node);
        this.selectRecord(node);
    }

    protected addNode() {
        let node;
        if (this.contextMenuNode != null && "records" in this.contextMenuNode) {
            this.dataSource.toggleNode(this.contextMenuNode, true);
            node = this.contextMenuNode;
        } else {
            node = undefined;
        }
        this.closeContextMenu();
        const newNode = this.recordsStore.createRecord(node);
        setTimeout(() => {
            this.nodeRenaming.set(newNode);
        });
    }

    protected addRecordGroup() {
        if (this.contextMenuNode != null && "records" in this.contextMenuNode) {
            this.dataSource.toggleNode(this.contextMenuNode, true);
        }
        this.closeContextMenu();
        this.recordsStore.createRecordGroup(this.contextMenuNode);
    }

    protected renameNode($event: Event) {
        this.nodeRenaming.set(this.contextMenuNode);
        $event.stopPropagation();
        setTimeout(() => {
            if (this.renameInput() != null) {
                this.renameInput()?.nativeElement.focus();
            }
        });
        this.closeContextMenu();
    }

    protected cancelRename() {
        this.nodeRenaming.set(undefined);
    }

    protected completeRename() {
        const newName = this.renameInput()?.nativeElement.value;
        const node = this.nodeRenaming();
        if (node != null && newName) {
            this.recordsStore.renameRecord(node, newName);
        }
        this.nodeRenaming.set(undefined);
    }

    protected removeNode() {
        if (this.contextMenuNode) {
            this.recordsStore.removeRecord(this.contextMenuNode);
        }
    }

    private closeContextMenu() {
        this.showContextMenu.set(false);
    }

    protected selectNode($event: MouseEvent, node: RecordEntity) {
        $event.stopPropagation();
        this.recordsStore.selectItem(node);
    }

    private selectRecord(record: RecordEntity) {
        this.recordsStore.selectItem(record);
    }
}
