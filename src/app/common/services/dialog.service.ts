import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogComponent } from '../../views/common/dialog/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogSubject = new BehaviorSubject<{ message: string, showCancel: boolean, resolve: (result: boolean) => void } | null>(null);

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  openDialog(message: string, showCancel: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.dialogSubject.next({ message, showCancel, resolve });

      // Create component dynamically
      const componentFactory = this.resolver.resolveComponentFactory(DialogComponent);
      const componentRef = componentFactory.create(this.injector);
      componentRef.instance.message = message;
      componentRef.instance.showCancel = showCancel;
      componentRef.instance.dialogClose.subscribe((result: boolean) => {
        resolve(result);
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });

      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });
  }

  closeDialog(result: boolean): void {
    const dialogState = this.dialogSubject.getValue();
    if (dialogState) {
      dialogState.resolve(result);
      this.dialogSubject.next(null);
    }
  }

  get dialogState() {
    return this.dialogSubject.asObservable();
  }
}
