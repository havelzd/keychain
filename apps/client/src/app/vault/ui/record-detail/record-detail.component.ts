import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordItem } from "../../store/records/records.models";

@Component({
    selector: "app-record-detail",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./record-detail.component.html",
    styleUrl: "./record-detail.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordDetailComponent {
    record = input.required<RecordItem | undefined>();

    passwordVisible = signal(false);
    password = computed(() =>
        this.passwordVisible()
            ? this.record()?.password
            : "•".repeat(this.record()?.password?.length ?? 0),
    );
}
