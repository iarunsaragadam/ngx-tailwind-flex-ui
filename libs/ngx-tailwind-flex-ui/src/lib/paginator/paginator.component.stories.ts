import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/Paginator',
  component: PaginatorComponent,
  standalone: true,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    length: { control: { type: 'number', min: 1 }, description: 'Total number of items' },
    pageSize: { control: { type: 'number', min: 1 }, description: 'Items per page' },
    pageIndex: { control: { type: 'number', min: 0 }, description: 'Current page index' },
    pageChange: { action: 'pageChange', description: 'Emits when the page changes' },
  },
} as Meta<PaginatorComponent>;

export const Default: StoryObj<PaginatorComponent> = {
  args: {
    length: 100,
    pageSize: 10,
    pageIndex: 0,
  },
};
