import { computed, signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";
import { AbstractDataSource, TrackVal } from "./abstract-data-source";

export class StaticTreeDataSource<T> extends AbstractDataSource<T> {
  protected _nodes: WritableSignal<TreeNode<T>[]>;
  protected _flatNodes = computed(() => {
    const flatNode = this._flattenNodes(this._nodes());
    return flatNode;
  });
  private collapsedState = new Map<TrackVal<T>, TreeNode<T>>();

  constructor(
    nodes: T[],
    hasChilren: (n: T) => boolean,
    getChildren: (n: T) => T[] | undefined,
    trackBy: ((value: T) => number | string) | undefined = undefined,
  ) {
    super(hasChilren, getChildren, trackBy);
    this._nodes = signal(this.createTreeNodes(nodes));
  }

  private createTreeNodes(nodes: T[]) {
    return (
      nodes?.map((n) => {
        const trackValue = this.trackBy(n);
        const knownNode: TreeNode<T> | undefined = this.collapsedState.get(trackValue);
        if (knownNode == null) {
          const hasChildren = this.hasChilren(n);
          const treeNode: TreeNode<T> = {
            id: this.trackBy(n),
            value: n,
            expanded: signal(false),
            hasChildren: signal(hasChildren),
          };
          const children = this.getChildren(n);
          if (hasChildren && children) {
            treeNode.children = signal(this.createTreeNodes(children));
          }
          this.collapsedState.set(treeNode.id, treeNode);
          return treeNode;
        } else {
          knownNode.hasChildren.set(this.hasChilren(n));
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

  toggleNode(valueNode: T) {
    const treeNode = this._flatNodes()?.find((n) => n.value === valueNode);
    if (treeNode) {
      treeNode.expanded.update((v) => !v);
    }
  }

  private _flattenNodes(nodes: TreeNode<T>[]) {
    function flatten(node: TreeNode<T>): TreeNode<T>[] {
      const children = node.children?.() ?? [];
      return [node, ...children.flatMap(flatten)];
    }
    return nodes.flatMap(flatten);
  }
}
