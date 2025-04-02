import { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

export default {
  title: 'Components/Chip', // Set the category in Storybook
  component: ChipComponent, // Define the component
  tags: ['autodocs'], // Add metadata for documentation
  parameters: {
    layout: 'centered', // Centered layout for better visibility
  },
} satisfies Meta<ChipComponent>;

// Define individual stories with different configurations

export const Default: StoryObj<ChipComponent> = {
  args: {
    clickable: false,
    removable: false,
    disabled: false,
    icon: 'star', // Example icon
  },
};

export const Clickable: StoryObj<ChipComponent> = {
  args: {
    clickable: true,
    removable: false,
    disabled: false,
    icon: 'check_circle',
  },
};

export const Removable: StoryObj<ChipComponent> = {
  args: {
    clickable: false,
    removable: true,
    disabled: false,
    icon: 'close',
  },
};

export const Disabled: StoryObj<ChipComponent> = {
  args: {
    clickable: false,
    removable: false,
    disabled: true,
    icon: 'block',
  },
};