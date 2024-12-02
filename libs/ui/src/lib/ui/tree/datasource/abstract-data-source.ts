import { signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";

export type TrackVal<T> = number | string | T;

export abstract class AbstractDataSource<T> {
  protected abstract _nodes: WritableSignal<TreeNode<T>[]>;
  protected hasChilren: (n: T) => boolean;
  protected getChildren: (n: T) => T[] | undefined;
  protected trackBy: ((value: T) => number | string) | ((value: T) => T);
  protected _selectedNode: WritableSignal<TreeNode<T> | undefined>;

  private identity = (n: T) => n;

  constructor(
    hasChilren: (n: T) => boolean,
    getChildren: (n: T) => T[] | undefined,
    trackBy: ((value: T) => number | string) | undefined = undefined,
  ) {
    this.hasChilren = hasChilren;
    this.getChildren = getChildren;
    if (trackBy == null) {
      this.trackBy = this.identity;
    } else {
      this.trackBy = trackBy;
    }
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
