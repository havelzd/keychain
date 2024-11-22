import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppearanceSettingComponent } from "./appearance.component";

describe("AppearanceSettingComponent", () => {
    let component: AppearanceSettingComponent;
    let fixture: ComponentFixture<AppearanceSettingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppearanceSettingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppearanceSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
