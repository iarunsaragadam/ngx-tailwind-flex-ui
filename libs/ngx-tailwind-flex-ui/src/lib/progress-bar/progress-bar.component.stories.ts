import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  title: 'Components/ProgressBar',
  component: ProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
      description: 'Defines progress bar mode',
    },
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Current progress value (for determinate mode)',
    },
    bufferValue: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Buffer progress value (for buffer mode)',
    },
    class: {
      control: 'text',
      description: 'Additional Tailwind CSS classes for styling',
    },
  },
};

export default meta;

type Story = StoryObj<ProgressBarComponent>;

export const Determinate: Story = {
  args: { mode: 'determinate', value: 50 },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [mode]="mode" [value]="value"></lib-progress-bar>`,
  }),
};

export const Indeterminate: Story = {
  args: { mode: 'indeterminate' },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [mode]="mode"></lib-progress-bar>`,
  }),
};

export const Buffer: Story = {
  args: { mode: 'buffer', value: 50, bufferValue: 80 },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [mode]="mode" [value]="value" [bufferValue]="bufferValue"></lib-progress-bar>`,
  }),
};

export const Query: Story = {
  args: { mode: 'query' },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [mode]="mode"></lib-progress-bar>`,
  }),
};
