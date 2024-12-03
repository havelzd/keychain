import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  viewChild,
} from "@angular/core";
import { CommonModule, NgStyle } from "@angular/common";
import { RecordEntity, RecordGroup, RecordItem } from "../../store/records/records.models";
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
  records = input.required<RecordEntity[] | null>();
  nodeCreated = output<RecordGroup | undefined>();

  nodeRenamed = output<RecordEvent>();

  protected contextMenu = viewChild<ElementRef<HTMLDivElement>>("contextMenu");

  protected readonly folderIcon = faFolder;
  protected readonly folderOpenIcon = faFolderOpen;
  protected readonly keyIcon = faKey;
  protected readonly trackBy = (_idx: number, value: RecordEntity) => value.id;
  // protected readonly treeTrackBy = (val: RecordEntity) => val.id;
  protected readonly hasChildren = (node: RecordEntity) =>
    "records" in node ? node?.records != null && node.records.length > 0 : false;
  protected readonly getChildren = (node: RecordEntity) =>
    "records" in node ? node?.records : [];
  protected readonly dataSource = new StaticTreeDataSource(
    [],
    this.hasChildren,
    this.getChildren,
    // this.treeTrackBy,
  );

  protected showContextMenu = signal(false);
  protected menuXY = signal<[number, number]>([0, 0]);
  protected contextMenuNode: RecordGroup | undefined = undefined;

  // node rename
  protected nodeRenaming = signal<RecordEntity | undefined>(undefined);
  protected renameInput = viewChild<ElementRef<HTMLInputElement>>("renameInput");

  ngOnChanges(changes: SimpleChanges) {
    if (changes["records"]) {
      this.dataSource.nodes = this.records() ?? [];
    }
  }

  onContextMenu($event: MouseEvent | PointerEvent, node: RecordGroup | undefined) {
    $event.stopPropagation();
    $event.preventDefault();
    this.contextMenuNode = node;
    this.showContextMenu.update(() => true);
    this.contextMenu()?.nativeElement.focus();
    this.menuXY.set([$event.clientX + 10, $event.clientY]);
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
  }

  addNode() {
    if (this.contextMenuNode != null && "records" in this.contextMenuNode) {
      this.dataSource.toggleNode(this.contextMenuNode, true);
    }
    this.nodeCreated.emit(this.contextMenuNode);
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
      this.nodeRenamed.emit({ record: node, value: newName });
    }
    this.nodeRenaming.set(undefined);
  }

  removeNode() {
    throw new Error("not implemented yet");
  }

  menuBlur($event: Event) {
    console.log($event);
  }

  nothing() {
    console.log("RecordList rerender");
  }

  private closeContextMenu() {
    this.showContextMenu.set(false);
  }

  private openContextMenu() {
    this.showContextMenu.set(true);
  }
}
