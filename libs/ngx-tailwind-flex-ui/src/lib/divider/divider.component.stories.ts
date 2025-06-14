import { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  title: 'Components/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for customization',
    },
  },
};

export default meta;

type Story = StoryObj<DividerComponent>;

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-2">
        <p>Item 1</p>
        <lib-divider [orientation]="orientation"></lib-divider>
        <p>Item 2</p>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex space-x-2">
        <p>Item A</p>
        <lib-divider [orientation]="orientation"></lib-divider>
        <p>Item B</p>
      </div>
    `,
  }),
};

export const CustomStyled: Story = {
  args: { orientation: 'horizontal', className: 'bg-blue-500' },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-2">
        <p>Item 1</p>
        <lib-divider [orientation]="orientation" [className]="className"></lib-divider>
        <p>Item 2</p>
      </div>
    `,
  }),
};
