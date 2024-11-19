import { ChangeDetectionStrategy, Component, input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { TreeNode } from "../types/types";

@Component({
    selector: "lib-node",
    standalone: true,
    imports: [NgTemplateOutlet],
    templateUrl: "./node.component.html",
    styleUrl: "../styles.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent<T, K extends keyof T> {
    node = input.required<TreeNode<T>>();
    bindLabel = input<K>();
    rootTemplate = input.required<TemplateRef<unknown>>();
    leafTemplate = input.required<TemplateRef<unknown>>();

    nothing() {
        console.log("Node component rerender");
    }
}
