import { computed, signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";
import { AbstractDataSource } from "./abstract-data-source";

export class StaticTreeDataSource<T> extends AbstractDataSource<T> {
  protected _nodes: WritableSignal<TreeNode<T>[]>;
  protected _flatNodes = computed(() => {
    const flatNode = this._flattenNodes(this._nodes());
    console.log("flatNode", flatNode);
    return flatNode
  });
  private nodeCounter = 0;

  constructor(nodes: T[], hasChilren: (n: T) => boolean, getChildren: (n: T) => T[] | undefined) {
    super(hasChilren, getChildren);
    this._nodes = signal(this.createTreeNodes(nodes));
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
    return this._nodes();
  }

  set nodes(nodes: T[]) {
    this._nodes.set(this.createTreeNodes(nodes));
  }

  toggleNode(valueNode: T) {
    const treeNode = this._flatNodes()?.find((n) => n.value === valueNode);
    if (treeNode) {
      treeNode.expanded.update((v) => !v);
      console.log(treeNode);
    }
  }

  private _flattenNodes(nodes: TreeNode<T>[]) {
    return nodes.flat(Infinity);
  }
}
