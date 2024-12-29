import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    OnChanges,
    output,
    signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordItem, RecordType, RecordTypeLabels } from "../../store/records/records.models";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash, faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FormsModule } from "@angular/forms";
import { Clipboard } from "@angular/cdk/clipboard";
import { Popup } from "@keychain/ui";

@Component({
    selector: "app-record-detail",
    standalone: true,
    imports: [CommonModule, FaIconComponent, FormsModule],
    providers: [Popup],
    templateUrl: "./record-detail.component.html",
    styleUrl: "./record-detail.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordDetailComponent implements OnChanges {
    record = input.required<RecordItem | undefined>();
    saved = output<RecordItem>();

    private readonly clipboard = inject(Clipboard);
    private readonly popup = inject(Popup);

    protected readonly eyeIcon = faEye;
    protected readonly eyeSlashIcon = faEyeSlash;
    protected readonly faPenToSquare = faPenToSquare;
    protected readonly faSave = faSave;
    protected readonly recordTypeLabels = RecordTypeLabels;
    protected readonly recordTypeOpts = Object.entries(RecordTypeLabels);
    protected readonly passwordVisible = signal(false);
    protected readonly password = computed(() =>
        this.passwordVisible()
            ? this.record()?.password
            : "•".repeat(this.record()?.password?.length ?? 0),
    );
    protected readonly recordType = computed(() => {
        const record = this.record();
        return record != null ? this.recordTypeLabels[record.type] : "N/A";
    });

    protected readonly editedRecord = signal<RecordItem>({
        id: -1,
        password: "",
        username: "",
        name: "",
        description: "",
        type: RecordType.LOGIN,
        createdOn: new Date(),
    });
    protected readonly isEdit = signal(false);

    ngOnChanges() {
        console.log("RecordDetailComponent: ngOnChanges", this.record());
        this.isEdit.set(false);
        const record = this.record();
        if (record) {
            this.editedRecord.set({ ...record });
        }
    }

    protected copyToClipBoard(value: string | undefined) {
        if (value) {
            this.clipboard.copy(value);
            this.popup.showPopup({ body: "Copied to clipboard" });
        }
    }

    protected saveRecord() {
        this.isEdit.set(false);
        const record = this.editedRecord();
        if (record) {
            this.saved.emit(record);
        }
    }
}
