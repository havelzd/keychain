import { signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";

export type TrackVal<T> = number | string | T;

export abstract class AbstractDataSource<T> {
  protected abstract _nodes: WritableSignal<TreeNode<T>[]>;
  protected hasChilren: (n: T) => boolean;
  protected getChildren: (n: T) => T[] | undefined;
  protected trackBy: ((value: T) => number | string) | ((value: T) => T);

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
  }

  abstract get rootNodes(): TreeNode<T>[];
}
