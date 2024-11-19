import { WritableSignal } from "@angular/core";

export type TreeNode<T> = {
  id: number;
    value: T;
    expanded: WritableSignal<boolean>;
    hasChildren: WritableSignal<boolean>;
    children?: WritableSignal<TreeNode<T>[]>;
};
