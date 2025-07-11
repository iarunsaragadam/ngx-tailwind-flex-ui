import { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    labelPosition: {
      control: 'select',
      options: ['before', 'after'],
      description: 'Position of the label relative to the checkbox',
    },
    class: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for customization',
    },
  },
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    checked: false,
  },
  render: (args) => ({
    props: args,
  }),
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: (args) => ({
    props: args,
  }),
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
  render: (args) => ({
    props: args,
  }),
};

export const Indeterminate: Story = {
  args: {
    checked: false,
    indeterminate: true,
  },
  render: (args) => ({
    props: args,
  }),
};

export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'Checkbox Label',
  },
  render: (args) => ({
    props: args,
  }),
};

export const WithLabelPositionBefore: Story = {
  args: {
    checked: false,
    label: 'Checkbox Label',
    labelPosition: 'before',
  },
  render: (args) => ({
    props: args,
  }),
};

export const CustomStyled: Story = {
  args: {
    checked: false,
    class: 'text-lg',
  },
  render: (args) => ({
    props: args,
  }),
};