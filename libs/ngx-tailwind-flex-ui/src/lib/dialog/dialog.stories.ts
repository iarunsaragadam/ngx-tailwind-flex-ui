import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Component, Inject, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog.tokens';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'lib-demo-dialog',
  template: `
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-4" lib-dialog-title>Confirm Action</h2>
      <div class="mb-4" lib-dialog-content>
        <p>{{ data.message }}</p>
      </div>
      <div class="flex justify-end space-x-2" lib-dialog-actions>
        <button
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          (click)="dialogRef.close(false)"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          (click)="dialogRef.close(true)"
        >
          Confirm
        </button>
      </div>
    </div>
  `
})
class DemoDialogComponent {
  constructor(
    public dialogRef: DialogRef<boolean>,
    @Inject(DIALOG_DATA) public data: { message: string }
  ) {}
}

export default {
  title: 'Components/Dialog',
  decorators: [
    moduleMetadata({
      imports: [DialogComponent],
      providers: [DialogService]
    })
  ],
  parameters: {
    layout: 'centered'
  }
} as Meta;

export const Basic: StoryObj = {
  render: (args) => ({
    props: {
      ...args,
      openDialog: () => {
        const dialogService = inject(DialogService);
        const dialogRef = dialogService.open(DemoDialogComponent, {
          data: { message: 'Are you sure you want to proceed?' }
        });

        dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
          console.log('Dialog result:', result);
        });
      }
    },
    template: `
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        (click)="openDialog()"
      >
        Open Dialog
      </button>
    `
  })
}; 