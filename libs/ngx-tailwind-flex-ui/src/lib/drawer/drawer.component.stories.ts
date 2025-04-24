import { Meta, StoryFn } from '@storybook/angular';
import { DrawerComponent } from './drawer.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/Drawer',
  component: DrawerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    position: { control: 'radio', options: ['left', 'right'] },
    mode: { control: 'radio', options: ['temporary', 'persistent', 'mini'] },
    open: { control: 'boolean' },
    openChange: { action: 'openChange' },
  },
} as Meta<DrawerComponent>;

const Template: StoryFn<DrawerComponent> = (args) => ({
  props: {
    ...args,
    handleToggle: () => {
      args.open = !args.open;
      args.openChange(args.open); // manually emit for Storybook
    },
  },
  template: `
    <lib-drawer [mode]="mode" [position]="position" [open]="open" (openChange)="openChange($event)">
      <div drawerContent class="h-full p-4 bg-blue-100">
        <p class="font-semibold">Drawer content ({{ mode }} | {{ position }})</p>
      </div>
      <div mainContent class="p-4">
        <p>Main content area</p>
        <button
          *ngIf="mode === 'temporary'"
          (click)="handleToggle()"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Toggle Drawer
        </button>
      </div>
    </lib-drawer>
  `,
});

export const Default = Template.bind({});
Default.args = {
  position: 'left',
  mode: 'persistent',
  open: true,
};

export const Temporary = Template.bind({});
Temporary.args = {
  position: 'left',
  mode: 'temporary',
  open: false,
};

export const RightMini = Template.bind({});
RightMini.args = {
  position: 'right',
  mode: 'mini',
  open: true,
};