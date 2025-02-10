import { Injectable, ApplicationRef, Injector, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import { DialogComponent } from '../../views/common/dialog/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef: ComponentRef<any> | null = null;
  private dialogContainer: ViewContainerRef | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  setDialogContainer(container: ViewContainerRef) {
    this.dialogContainer = container;
  }

  openDialog(message: string, showCancel: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (!this.dialogContainer) {
        throw new Error('Dialog container is not set.');
      }

      // Create component dynamically
      const componentRef = this.dialogContainer.createComponent(DialogComponent);
      componentRef.instance.message = message;
      componentRef.instance.showCancel = showCancel;
      componentRef.instance.dialogClose.subscribe((result: boolean) => {
        resolve(result);
        this.closeDialog();
      });

      this.dialogRef = componentRef;
    });
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.destroy();
      this.dialogRef = null;
    }
  }
}
