import { ChangeDetectionStrategy, Component, DoCheck, effect, input, TemplateRef } from "@angular/core";
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
export class NodeComponent<T, K extends keyof T> implements DoCheck {
    node = input.required<TreeNode<T>>();
    bindLabel = input<K>();
    rootTemplate = input.required<TemplateRef<unknown>>();
    leafTemplate = input.required<TemplateRef<unknown>>();

    log = effect(() => {
        console.log(this.node());
    });

  ngDoCheck(): void {
    console.log("node CD")
  }
}
