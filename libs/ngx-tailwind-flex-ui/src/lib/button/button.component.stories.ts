import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'outline', 'text'],
      description: 'Button style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    class: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for customization',
    },
  },
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant" [disabled]="disabled">Primary Button</lib-button>`,
  }),
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant" [disabled]="disabled">Accent Button</lib-button>`,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant" [disabled]="disabled">Outline Button</lib-button>`,
  }),
};

export const Text: Story = {
  args: {
    variant: 'text',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant" [disabled]="disabled">Text Button</lib-button>`,
  }),
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant" [disabled]="disabled">Disabled Button</lib-button>`,
  }),
};

export const CustomStyled: Story = {
  args: {
    variant: 'primary',
    class: 'text-lg px-6 py-3 bg-green-500 hover:bg-green-600',
  },
  render: (args) => ({
    props: args,
    template: `<lib-button [variant]="variant" [class]="class">Custom Styled Button</lib-button>`,
  }),
};
