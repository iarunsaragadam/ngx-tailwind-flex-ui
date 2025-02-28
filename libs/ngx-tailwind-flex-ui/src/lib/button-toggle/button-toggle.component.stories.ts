import { Meta, StoryObj } from '@storybook/angular';
import { ButtonToggleComponent } from './button-toggle.component';

const meta: Meta<ButtonToggleComponent> = {
  title: 'Components/ButtonToggle',
  component: ButtonToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'boolean',
      description: 'Current state of the button (On/Off)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    additionalClasses: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for customization',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonToggleComponent>;

export const Default: Story = {
  args: {
    state: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-button-toggle [state]="state" [disabled]="disabled">Toggle</app-button-toggle>`,
  }),
};

export const Disabled: Story = {
  args: {
    state: false,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<app-button-toggle [state]="state" [disabled]="disabled">Disabled Toggle</app-button-toggle>`,
  }),
};
