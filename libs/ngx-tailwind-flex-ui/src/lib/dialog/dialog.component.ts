import { Component, Inject, Input, Optional, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA } from './dialog.tokens';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      (click)="onBackdropClick($event)"
      (keydown.escape)="onEscapeKey($event)"
      tabindex="-1"
    >
      <div
        class="relative bg-white rounded-lg shadow-xl dark:bg-gray-800 min-w-[300px]"
        role="dialog"
        [attr.aria-labelledby]="ariaLabelledBy"
        [attr.aria-describedby]="ariaDescribedBy"
        (click)="$event.stopPropagation()"
        (keydown)="onDialogKeydown($event)"
        tabindex="0"
      >
        <ng-content select="[lib-dialog-title]"></ng-content>
        <ng-content select="[lib-dialog-content]"></ng-content>
        <ng-content select="[lib-dialog-actions]"></ng-content>
      </div>
    </div>
  `,
  host: {
    'class': 'block',
  }
})
export class DialogComponent {
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;

  constructor(
    public dialogRef: DialogRef<any>,
    @Optional() @Inject(DIALOG_DATA) public data: any
  ) {}

  onBackdropClick(event: MouseEvent): void {
    if (this.dialogRef.config.disableClose) {
      return;
    }
    this.dialogRef.close();
  }

  onEscapeKey(event: KeyboardEvent): void {
    if (!this.dialogRef.config.disableClose) {
      this.dialogRef.close();
    }
  }

  onDialogKeydown(event: KeyboardEvent): void {
    event.stopPropagation();
  }

  @HostListener('window:keydown.escape')
  handleEscapeKey(): void {
    if (!this.dialogRef.config.disableClose) {
      this.dialogRef.close();
    }
  }
} 