import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RecordGroupDetailComponent } from "./record-group-detail.component";

describe("RecordGroupDetailComponent", () => {
    let component: RecordGroupDetailComponent;
    let fixture: ComponentFixture<RecordGroupDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecordGroupDetailComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecordGroupDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
