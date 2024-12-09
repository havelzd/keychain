import {
    Component,
    computed,
    input,
    OnInit,
    output,
    signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { PopupOptions } from "./popup";

@Component({
    selector: "lib-popup",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./popup.component.html",
    styleUrl: "./popup.component.scss",
})
export class PopupComponent implements OnInit {
    opts = input<PopupOptions>({
        title: "Popup",
        body: "Hello, World!",
    });
    destroy = output();

    // TODO: Sanitize title and body

    protected title = computed(() => {
        const title = this.opts().title;
        if (title) {
            return title;
        } else {
            return "";
        }
    });
    protected body = computed(() => {
        const body = this.opts().body;
        console.log("body", body);
        if (body) {
            return body;
        } else {
            return "";
        }
    });

    protected hide = signal(false);

    ngOnInit() {
        setTimeout(() => {
            this.hide.set(true);
            setTimeout(() => {
                this.destroy.emit();
            }, 2500);
        });
    }
}
