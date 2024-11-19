import { signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";
import { AbstractDataSource } from "./abstract-data-source";

export class StaticTreeDataSource<T> extends AbstractDataSource<T> {
    protected nodes: WritableSignal<TreeNode<T>[]>;
    private nodeCounter = 0;

    constructor(nodes: T[], hasChilren: (n: T) => boolean, getChildren: (n: T) => T[] | undefined) {
        super(hasChilren, getChildren);
        this.nodes = signal(this.createTreeNodes(nodes));
    }

    private createTreeNodes(nodes: T[]) {
        return (
            nodes?.map((n) => {
                const hasChildren = this.hasChilren(n);
                const treeNode: TreeNode<T> = {
                    id: this.nodeCounter++,
                    value: n,
                    expanded: signal(false),
                    hasChildren: signal(hasChildren),
                };
                const children = this.getChildren(n);
                if (hasChildren && children) {
                    treeNode.children = signal(this.createTreeNodes(children));
                }
                return treeNode;
            }) ?? []
        );
    }

    get rootNodes() {
        console.log("nodes", this.nodes());
        return this.nodes;
    }
}
