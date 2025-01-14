import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    input,
    TemplateRef,
    viewChild,
} from "@angular/core";
import { TreeNode } from "../types/types";
import { NodeComponent } from "../node/node.component";
import { NgTemplateOutlet } from "@angular/common";
import { AbstractDataSource } from "../datasource/abstract-data-source";

@Component({
    selector: "lib-tree",
    standalone: true,
    imports: [NodeComponent, NgTemplateOutlet],
    templateUrl: "./tree.component.html",
    styleUrl: "../styles.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent<T, K extends keyof T> {
    dataSource = input.required<AbstractDataSource<T, K>>();
    nodes = input<TreeNode<T>[]>();
    bindLabel = input<K>();

    protected readonly rootTmpl = contentChild<TemplateRef<unknown>>("parentNode");
    protected readonly leafTmpl = contentChild<TemplateRef<unknown>>("leafNode");
    protected readonly defaultRootContent =
        viewChild.required<TemplateRef<unknown>>("defaultRootContent");
    protected readonly rootContent = computed(() => this.rootTmpl() || this.defaultRootContent());
    protected readonly defaultLeafContent =
        viewChild.required<TemplateRef<unknown>>("defaultLeafContent");
    protected readonly leafContent = computed(() => this.leafTmpl() || this.defaultLeafContent());

    protected readonly viewNodes = computed(() =>
        this.nodes == null || this.nodes.length === 0 ? this.dataSource().rootNodes : this.nodes(),
    );
}
