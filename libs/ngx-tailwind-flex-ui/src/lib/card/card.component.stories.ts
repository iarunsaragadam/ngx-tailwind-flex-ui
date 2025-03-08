import { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Card style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Amount of padding inside the card',
    },
    rounded: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'full'],
      description: 'Border radius of the card',
    },
    class: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for customization',
    },
  },
};

export default meta;

type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'medium',
    rounded: 'medium',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-card [variant]="variant" [padding]="padding" [rounded]="rounded" [class]="class">
        <div class="p-4">
          <h3 class="text-lg font-medium">Card Title</h3>
          <p class="mt-2 text-gray-600">Card content goes here. This demonstrates the basic usage of the Card component.</p>
        </div>
      </lib-card>
    `,
  }),
};
