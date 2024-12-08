import { ChangeDetectionStrategy, Component, OnInit, signal } from "@angular/core";
import { getTauriVersion, getVersion } from "@tauri-apps/api/app";

@Component({
    standalone: true,
    selector: "app-about-shell",
    templateUrl: "./about-shell.component.html",
    styleUrls: ["./about-shell.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutShellComponent implements OnInit {
    tauriVersion = signal("");
    appVersion = signal("");

    async ngOnInit() {
        this.appVersion.set(await getVersion());
        this.tauriVersion.set(await getTauriVersion());
        console.log(this.appVersion);
        console.log(this.tauriVersion);
    }
}
