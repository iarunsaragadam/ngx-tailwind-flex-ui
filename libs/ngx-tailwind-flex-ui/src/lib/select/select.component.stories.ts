import { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

export default {
  title: 'Components/Select',
  component: SelectComponent,
} as Meta<SelectComponent>;

const Template: StoryObj<SelectComponent> = {
  render: (args) => ({
    props: args,
  }),
};

export const Basic = {
  ...Template,
  args: {
    placeholder: 'Pick a color',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Yellow', value: 'yellow' },
    ],
  },
};

export const WithMultiple = {
  ...Template,
  args: {
    placeholder: 'Select multiple',
    multiple: true,
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Mango', value: 'mango' },
    ],
  },
};

export const WithValidation = {
  ...Template,
  args: {
    placeholder: 'Required field',
    required: true,
    options: [
      { label: 'Item A', value: 'a' },
      { label: 'Item B', value: 'b' },
    ],
  },
};
