import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SettingShellComponent } from "./setting-shell.component";

describe("SettingShellComponent", () => {
    let component: SettingShellComponent;
    let fixture: ComponentFixture<SettingShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingShellComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SettingShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
