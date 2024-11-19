import { signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";

export abstract class AbstractDataSource<T> {
  protected abstract _nodes: WritableSignal<TreeNode<T>[]>;
  protected hasChilren: (n: T) => boolean;
  protected getChildren: (n: T) => T[] | undefined;
  protected _selectedNode: WritableSignal<TreeNode<T> | undefined>;

  constructor(hasChilren: (n: T) => boolean, getChildren: (n: T) => T[] | undefined) {
    this.hasChilren = hasChilren;
    this.getChildren = getChildren;
    this._selectedNode = signal(undefined);
  }

  abstract get rootNodes(): TreeNode<T>[];

  set selectNode(node: TreeNode<T> | undefined) {
    this._selectedNode.set(node);
  }

  get selectedNode() {
    return this._selectedNode.asReadonly();
  }
}
