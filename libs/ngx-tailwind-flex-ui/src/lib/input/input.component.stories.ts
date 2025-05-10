import { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Form/Input',
  component: InputComponent,
  tags: ['autodocs'],
  render: (args: InputComponent) => ({ props: args }),
};
export default meta;

type Story = StoryObj<InputComponent>;

export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Outline input',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled input',
  },
};

export const Error: Story = {
  args: {
    state: 'error',
    placeholder: 'Error state',
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    placeholder: 'Success state',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};
