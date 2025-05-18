import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable, Type, Injector } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog.tokens';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialogRefs = new Set<DialogRef<any>>();

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<T, D = any, R = any>(
    component: Type<T>,
    config: DialogConfig<D> = {}
  ): DialogRef<R> {
    // Create an instance of DialogRef
    const dialogRef = new DialogRef<R>(config);
    this.dialogRefs.add(dialogRef);

    // Create the dialog component
    const dialogComponentRef = this.createDialogComponent(dialogRef, config);

    // Create the content component
    const contentComponentRef = this.createContentComponent(
      component,
      dialogComponentRef,
      config
    );

    // Setup cleanup when dialog is closed
    dialogRef.afterClosed().subscribe(() => {
      this.removeDialog(dialogRef, dialogComponentRef, contentComponentRef);
    });

    return dialogRef;
  }

  private createDialogComponent<R>(
    dialogRef: DialogRef<R>,
    config: DialogConfig
  ): ComponentRef<DialogComponent> {
    const dialogComponentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
      projectableNodes: []
    });

    // Set the dialogRef instance on the component
    dialogComponentRef.instance.dialogRef = dialogRef;
    dialogComponentRef.instance.ariaLabelledBy = config.ariaLabelledBy;
    dialogComponentRef.instance.ariaDescribedBy = config.ariaDescribedBy;

    // Attach to the view
    document.body.appendChild(dialogComponentRef.location.nativeElement);
    this.appRef.attachView(dialogComponentRef.hostView);

    return dialogComponentRef;
  }

  private createContentComponent<T, D>(
    component: Type<T>,
    dialogComponentRef: ComponentRef<DialogComponent>,
    config: DialogConfig<D>
  ): ComponentRef<T> {
    const contentComponentRef = createComponent(component, {
      environmentInjector: this.injector,
      projectableNodes: [],
      elementInjector: Injector.create({
        providers: [
          { provide: DIALOG_DATA, useValue: config.data }
        ],
        parent: this.injector
      })
    });

    // Attach the content component to the dialog
    const contentElement = contentComponentRef.location.nativeElement;
    dialogComponentRef.location.nativeElement.querySelector('.relative').appendChild(contentElement);
    this.appRef.attachView(contentComponentRef.hostView);

    return contentComponentRef;
  }

  private removeDialog<T, R>(
    dialogRef: DialogRef<R>,
    dialogComponentRef: ComponentRef<DialogComponent>,
    contentComponentRef: ComponentRef<T>
  ): void {
    this.appRef.detachView(contentComponentRef.hostView);
    contentComponentRef.destroy();
    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
    document.body.removeChild(dialogComponentRef.location.nativeElement);
    this.dialogRefs.delete(dialogRef);
  }
} 