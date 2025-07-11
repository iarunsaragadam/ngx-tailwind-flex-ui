import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
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
  },
};

export default meta;

type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {
  args: {
    progress: 25,
    color: "primary",
    variant: 'determinate',
    bufferProgress: 0
  },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [progress]="progress" [color]="color" [variant]="variant" [bufferProgress]="bufferProgress"></lib-progress-bar>`,
  }),
};

export const GreenProgress: Story = {
  args: {
    progress: 70,
    color: 'success',
    variant: 'determinate',
    bufferProgress: 0
  },
  render: (args) => ({
    props: args,
    template: `<lib-progress-bar [progress]="progress" [color]="color" [variant]="variant" [bufferProgress]="bufferProgress"></lib-progress-bar>`,
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
    template: `<lib-progress-bar [progress]="progress" [bufferProgress]="bufferProgress" [color]="color" [variant]="variant"></lib-progress-bar>`,
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
  }),
};
