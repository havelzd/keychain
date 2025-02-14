import { Injectable, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class HeaderService {
    private _title = signal("Title");
    title = this._title.asReadonly();

    private _menuToggleClicked = new Subject<void>();
    menuToggleClicked$ = this._menuToggleClicked.asObservable();

    setTitle(title: string) {
        this._title.set(title);
    }

    toggleMenu() {
        this._menuToggleClicked.next();
    }
}
