import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RecordDetailEditComponent } from "./record-detail-edit.component";

describe("RecordDetailEditComponent", () => {
    let component: RecordDetailEditComponent;
    let fixture: ComponentFixture<RecordDetailEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecordDetailEditComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecordDetailEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
