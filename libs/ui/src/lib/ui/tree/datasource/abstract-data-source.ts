import { signal, WritableSignal } from "@angular/core";
import { TreeNode } from "../types/types";

export type TrackVal<T, K extends keyof T> = number | string | T;

export abstract class AbstractDataSource<T, K extends keyof T> {
    protected abstract _nodes: WritableSignal<TreeNode<T>[]>;
    protected hasChildren: (n: T) => boolean;
    protected getChildren: (n: T) => T[] | undefined;
    public trackBy: K;

    protected constructor(
        hasChildren: (n: T) => boolean,
        getChildren: (n: T) => T[] | undefined,
        trackBy: K,
    ) {
        this.hasChildren = hasChildren;
        this.getChildren = getChildren;
        this.trackBy = trackBy;
    }

    abstract get rootNodes(): TreeNode<T>[];
}
