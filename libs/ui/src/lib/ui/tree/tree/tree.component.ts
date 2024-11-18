import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    input,
    TemplateRef,
    viewChild,
} from "@angular/core";
import { StaticTreeDataSource } from "../datasource/tree-data-source";
import { TreeNode } from "../types/types";
import { NodeComponent } from "../node/node.component";
import { NgTemplateOutlet } from "@angular/common";

@Component({
    selector: "lib-tree",
    standalone: true,
    imports: [NodeComponent, NgTemplateOutlet],
    templateUrl: "./tree.component.html",
    styleUrl: "../styles.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent<T, K extends keyof T> {
    dataSource = input.required<StaticTreeDataSource<T>>();
    nodes = input<TreeNode<T>[]>();
    bindLabel = input<K>();

    protected readonly rootTmpl = contentChild<TemplateRef<unknown>>("parentNode");
    protected readonly leafTmpl = contentChild<TemplateRef<unknown>>("leafNode");
    protected readonly defaultRootContent = viewChild.required<TemplateRef<unknown>>("defaultRootContent");
    protected readonly rootContent = computed(() => this.rootTmpl() || this.defaultRootContent());

    protected readonly viewNodes = computed(() =>
        this.nodes == null || this.nodes.length === 0
            ? this.dataSource().rootNodes()
            : this.nodes(),
    );
}
