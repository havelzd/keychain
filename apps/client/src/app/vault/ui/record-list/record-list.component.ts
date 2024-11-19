import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { CommonModule, NgStyle } from "@angular/common";
import { RecordEntity, RecordGroup, RecordItem } from "../../store/records/records.models";
import { TreeComponent, StaticTreeDataSource } from "@keychain/ui";

@Component({
  selector: "app-record-list",
  standalone: true,
  imports: [CommonModule, TreeComponent, NgStyle],
  templateUrl: "./record-list.component.html",
  styleUrl: "./record-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordListComponent {
  records = input.required<RecordItem[] | null>();
  nodeCreated = output<RecordGroup | undefined>();

  contextMenu = viewChild<ElementRef<HTMLDivElement>>("contextMenu");

  protected readonly hasChildren = (node: RecordEntity) =>
    "records" in node ? node?.records != null && node.records.length > 0 : false;
  protected readonly getChildren = (node: RecordEntity) =>
    "records" in node ? node?.records : [];
  protected readonly dataSource = computed(
    () => new StaticTreeDataSource(this.records() ?? [], this.hasChildren, this.getChildren),
  );

  protected showContextMenu = signal(false);
  protected menuXY = signal<[number, number]>([0, 0]);
  protected selectedNode: RecordGroup | undefined = undefined;

  onNodeSelect($event: MouseEvent | PointerEvent, node: RecordGroup | undefined) {
    $event.stopPropagation();
    $event.preventDefault();
    this.selectedNode = node;
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

  toggleNode(node: RecordItem) {
    console.log("toggle");
  }

  addNode() {
    this.nodeCreated.emit(this.selectedNode);
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
}
