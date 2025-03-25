import { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  argTypes: {
    message: { control: 'text' },
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
    },
    duration: { control: 'number' },
    action: { control: 'text' },
    dismissible: { control: 'boolean' },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<AlertComponent>;

export const BasicSnackBar: Story = {
  args: {
    message: 'Disco party!',
    type: 'info',
    action: 'Dance',
    duration: 5000,
    position: 'bottom-center',
  },
};

export const ConfigurablePosition: Story = {
  args: {
    message: 'Pool party!',
    type: 'info',
    duration: 5000,
    position: 'bottom-right',
  },
};

export const DismissibleError: Story = {
  args: {
    message: 'Something went wrong',
    type: 'error',
    dismissible: true,
    duration: 0,
    position: 'top-right',
  },
};

export const SuccessWithAction: Story = {
  args: {
    message: 'Data saved successfully',
    type: 'success',
    action: 'Undo',
    duration: 3000,
    position: 'bottom-center',
  },
};
