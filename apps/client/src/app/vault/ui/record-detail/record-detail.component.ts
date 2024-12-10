import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordItem } from "../../store/records/records.models";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash, faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-record-detail",
    standalone: true,
    imports: [CommonModule, FaIconComponent, FormsModule],
    templateUrl: "./record-detail.component.html",
    styleUrl: "./record-detail.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordDetailComponent {
    record = input.required<RecordItem | undefined>();

    protected readonly eyeIcon = faEye;
    protected readonly eyeSlashIcon = faEyeSlash;
    protected readonly faPenToSquare = faPenToSquare;
    protected readonly faSave = faSave;
    protected readonly passwordVisible = signal(false);
    protected readonly password = computed(() =>
        this.passwordVisible()
            ? this.record()?.password
            : "•".repeat(this.record()?.password?.length ?? 0),
    );

    protected isEdit = signal(false);
}
