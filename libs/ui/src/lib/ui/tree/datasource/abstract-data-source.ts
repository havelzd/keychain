import { WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";

export abstract class AbstractDataSource<T> {
    protected abstract nodes: WritableSignal<TreeNode<T>[]>;
    protected hasChilren: (n: T) => boolean;
    protected getChildren: (n: T) => T[] | undefined;

    constructor(hasChilren: (n: T) => boolean, getChildren: (n: T) => T[] | undefined) {
        this.hasChilren = hasChilren;
        this.getChildren = getChildren;
    }

    abstract get rootNodes(): WritableSignal<TreeNode<T>[]>;
}
