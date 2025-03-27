import { Meta, StoryObj } from '@storybook/angular';
import { LoadingSpinnerComponent } from './loadingSpinner.component';

const meta: Meta<LoadingSpinnerComponent> = {
  title: 'Components/LoadingSpinnerComponent',
  component: LoadingSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Loading state',
    },
    value: {
      control: 'number',
      description: 'Progress value (0-100) for determinate mode',
    },
    size: { control: 'number', description: 'Diameter in pixels' },
    thickness: { control: 'number', description: 'Stroke width in pixels' },
    color: {
      control: 'color',
      description: 'Spinner color (hex or Tailwind color)',
    },
  },
};

export default meta;
type Story = StoryObj<LoadingSpinnerComponent>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: 60,
  },
};

export const Thick: Story = {
  args: {
    thickness: 6,
  },
};

export const Colored: Story = {
  args: {
    color: '#ef4444', // Tailwind red-500
  },
};

export const Determinate: Story = {
  args: {
    mode: 'determinate',
    value: 50,
  },
};

export const DeterminateProgress: Story = {
  args: {
    mode: 'determinate',
    value: 75,
    size: 50,
    thickness: 5,
    color: '#10b981', // Tailwind green-500
  },
};
