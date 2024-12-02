import { WritableSignal } from "@angular/core";
import { TrackVal } from "../datasource/abstract-data-source";

export type TreeNode<T> = {
  id: TrackVal<T>;
  value: T;
  expanded: WritableSignal<boolean>;
  hasChildren: WritableSignal<boolean>;
  children?: WritableSignal<TreeNode<T>[]>;
};
