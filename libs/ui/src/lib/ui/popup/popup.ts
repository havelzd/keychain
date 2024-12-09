import {
    ApplicationRef,
    ComponentFactoryResolver,
    inject,
    Injectable,
    Injector,
} from "@angular/core";
import { PopupComponent } from "./popup.component";

export interface PopupOptions {
    title?: string;
    body?: string;
}

@Injectable()
export class Popup {
    private appRef = inject(ApplicationRef);
    private injector = inject(Injector);
    private componentFactory = inject(ComponentFactoryResolver);

    showPopup(options: PopupOptions) {
        const factory = this.componentFactory.resolveComponentFactory(PopupComponent);
        const componentRef = factory.create(this.injector);
        componentRef.setInput("opts", options);

        this.appRef.attachView(componentRef.hostView);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const domElement = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElement);

        componentRef.instance.destroy.subscribe(() => {
            this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        })
    }
}
