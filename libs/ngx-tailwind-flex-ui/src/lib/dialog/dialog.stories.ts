import { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog.tokens';

@Component({
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Confirm Action</h2>
      <p class="mb-6">Are you sure you want to proceed with this action?</p>
      <div class="flex justify-end space-x-4">
        <button
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
          (click)="dialogRef.close(false)"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
    public dialogRef: DialogRef<boolean>
  ) {}
}

export default {
  title: 'Dialog',
  decorators: []
} as Meta;

type Story = StoryObj<{ openDialog: () => void }>;

export const Basic: Story = {
  render: (args: { openDialog: () => void }) => ({
    props: {
      ...args,
      openDialog: () => {
        const dialogService = new DialogService(null!, null!);
        const dialogRef = dialogService.open<DemoDialogComponent, Record<string, never>, boolean>(DemoDialogComponent);
        
        dialogRef.afterClosed().subscribe({
          next: (result) => {
            if (result === true) {
              console.log('User confirmed');
            } else {
              console.log('User cancelled');
            }
          }
        });
      }
    },
    template: `
      <div class="p-4">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          (click)="openDialog()"
        >
          Open Dialog
        </button>
      </div>
    `
  })
}; 