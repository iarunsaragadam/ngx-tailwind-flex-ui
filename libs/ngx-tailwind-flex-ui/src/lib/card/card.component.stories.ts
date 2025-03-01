import { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'shadowed', 'interactive'],
      description: 'Card style variant',
    },
    additionalClasses: {
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
  },
  render: (args) => ({
    props: args,
    template: `<app-card [variant]="variant">Default Card Content</app-card>`,
  }),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => ({
    props: args,
    template: `<app-card [variant]="variant">Outlined Card</app-card>`,
  }),
};

export const Shadowed: Story = {
  args: {
    variant: 'shadowed',
  },
  render: (args) => ({
    props: args,
    template: `<app-card [variant]="variant">Shadowed Card</app-card>`,
  }),
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
  },
  render: (args) => ({
    props: args,
    template: `<app-card [variant]="variant">Interactive Card</app-card>`,
  }),
};
