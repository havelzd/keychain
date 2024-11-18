import { WritableSignal } from "@angular/core";

export type TreeNode<T> = {
    value: T;
    expanded: WritableSignal<boolean>;
    hasChildren: WritableSignal<boolean>;
    children?: WritableSignal<TreeNode<T>[]>;
};
