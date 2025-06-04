import { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Controls visibility' },
    title: { control: 'text', description: 'Dialog title' },
    description: { control: 'text', description: 'Dialog description' },
    class: { control: 'text', description: 'Custom Tailwind CSS classes' },
  },
};

export default meta;

type Story = StoryObj<DialogComponent>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Dialog Title',
    description: 'This is a dialog component using Tailwind CSS.',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-dialog [open]="open" [title]="title" [description]="description">
        <div class="text-right">
          <button class="bg-blue-600 text-white px-4 py-2 rounded" (click)="open = false">Close</button>
        </div>
      </lib-dialog>
    `,
  }),
};
