import { computed, signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";
import { AbstractDataSource } from "./abstract-data-source";

export class StaticTreeDataSource<T, K extends keyof T> extends AbstractDataSource<T, K> {
    protected _nodes: WritableSignal<TreeNode<T>[]>;
    protected _flatNodes = computed(() => {
        return this._flattenNodes(this._nodes());
    });
    private collapsedState = new Map<unknown, TreeNode<T>>();

    constructor(
        nodes: T[],
        hasChildren: (n: T) => boolean,
        getChildren: (n: T) => T[] | undefined,
        trackBy: K,
    ) {
        super(hasChildren, getChildren, trackBy);
        this._nodes = signal(this.createTreeNodes(nodes));
    }

    private createTreeNodes(nodes: T[]) {
        return (
            nodes?.map((n) => {
                const trackValue = n[this.trackBy];
                const knownNode: TreeNode<T> | undefined = this.collapsedState.get(trackValue);
                if (knownNode == null) {
                    const hasChildren = this.hasChildren(n);
                    const treeNode: TreeNode<T> = {
                        value: n,
                        expanded: signal(false),
                        hasChildren: signal(hasChildren),
                    };
                    const children = this.getChildren(n);
                    if (hasChildren && children) {
                        treeNode.children = signal(this.createTreeNodes(children));
                    }
                    this.collapsedState.set(trackValue, treeNode);
                    return treeNode;
                } else {
                    knownNode.hasChildren.set(this.hasChildren(n));
                    const children = this.getChildren(n);
                    if (knownNode.hasChildren() && children) {
                        knownNode.children?.set(this.createTreeNodes(children));
                    }
                    return knownNode;
                }
            }) ?? []
        );
    }

    get rootNodes() {
        return this._nodes();
    }

    set nodes(nodes: T[]) {
        this._nodes.set(this.createTreeNodes(nodes));
    }

    toggleNode(valueNode: T, expanded: boolean | undefined = undefined) {
        const treeNode = this._flatNodes()?.find((n) => n.value === valueNode);
        if (treeNode) {
            treeNode.expanded.update((v) => (expanded != null ? expanded : !v));
        }
    }

    isNodeExpanded(valueNode: T) {
        const treeNode = this.collapsedState.get(valueNode[this.trackBy]);
        return treeNode?.expanded() ?? false;
    }

    private _flattenNodes(nodes: TreeNode<T>[]) {
        function flatten(node: TreeNode<T>): TreeNode<T>[] {
            const children = node.children?.() ?? [];
            return [node, ...children.flatMap(flatten)];
        }

        return nodes.flatMap(flatten);
    }
}
