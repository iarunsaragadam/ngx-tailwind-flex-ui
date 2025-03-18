import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
<<<<<<< HEAD
  title: 'Components/Progress Bar',
  component: ProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0 to 100)',
    },
    // buffer: {
    //   control: { type: 'range', min: 0, max: 100, step: 1 },
    //   description: 'Buffer progress percentage (used in buffer variant)',
    // },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'Color of the progress bar',
    },
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
      description: 'Progress bar type',
    },
    // class: {
    //   control: 'text',
    //   description: 'Additional Tailwind CSS classes for customization',
    // },
=======
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
>>>>>>> bf823cd (add progress bar)
  },
};

export default meta;

type Story = StoryObj<ProgressBarComponent>;

<<<<<<< HEAD
export const Default: Story = {
  args: {
    progress: 25,
    color: "primary",
    variant: 'determinate',
    bufferProgress: 0
  },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [progress]="progress" [color]="color" [variant]="variant"></lib-progress-bar>`,
  }),
};

export const GreenProgress: Story = {
  args: {
    progress: 70,
    color: 'success',
    variant: 'determinate',
  },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [progress]="progress" [color]="color" [variant]="variant"></lib-progress-bar>`,
  }),
};

export const GreenBuffer: Story = {
  args: {
    progress: 40,
    bufferProgress: 5,
    color: 'success',
    variant: 'buffer',
  },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [progress]="progress" [buffer]="buffer" [color]="color" [variant]="variant"></lib-progress-bar>`,
  }),
};

export const RedIndeterminate: Story = {
  args: {
    color: 'error',
    variant: 'indeterminate',
  },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [color]="color" [variant]="variant"></lib-progress-bar>`,
  }),
};

export const CustomStyled: Story = {
  args: {
    progress: 60,
    color: 'primary',
    variant: 'determinate',
    class: 'h-6 rounded-lg',
  },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [progress]="progress" [color]="color" [variant]="variant" [class]="class"></lib-progress-bar>`,
=======
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
>>>>>>> bf823cd (add progress bar)
  }),
};
