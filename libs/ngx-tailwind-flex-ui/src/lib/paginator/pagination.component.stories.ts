import { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component'; // ✅ correct file

const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50],
  },
};
