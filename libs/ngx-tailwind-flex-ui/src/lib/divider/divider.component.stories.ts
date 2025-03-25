import { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  title: 'Components/DividerComponent',
  component: DividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    inset: { control: 'boolean', description: 'Adds inset margins if true' },
    thickness: { control: 'number', description: 'Border thickness in pixels' },
    color: {
      control: 'color',
      description: 'Border color (hex or Tailwind color)',
    },
    style: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Border style',
    },
    text: { control: 'text', description: 'Optional text inside the divider' },
    textColor: { control: 'color', description: 'Text color' },
    textSize: { control: 'text', description: 'Text font size (e.g., 1rem)' },
    textWeight: {
      control: 'text',
      description: 'Text font weight (e.g., bold)',
    },
    length: { control: 'text', description: 'Custom length (e.g., 50px, 50%)' },
    hoverEffect: { control: 'boolean', description: 'Enable hover effects' },
  },
};

export default meta;
type Story = StoryObj<DividerComponent>;

export const Default: Story = {
  args: {},
};

export const Inset: Story = {
  args: {
    inset: true,
  },
};

export const Thick: Story = {
  args: {
    thickness: 4,
  },
};

export const Colored: Story = {
  args: {
    color: '#ef4444', // Tailwind red-500
  },
};

export const Dashed: Story = {
  args: {
    style: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    style: 'dotted',
  },
};

export const WithText: Story = {
  args: {
    text: 'OR',
    textColor: '#ef4444',
    textSize: '1.5rem',
    textWeight: 'bold',
  },
};

export const CustomLength: Story = {
  args: {
    length: '200px',
  },
};

export const WithHover: Story = {
  args: {
    hoverEffect: true,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    length: '100px', // Or test without length in a container
    color: '#ff0000',
    text: 'OR',
    textColor: '#00ff00',
  },
  decorators: [
    (story) => ({
      template: `<div style="height: 200px;">${story()}</div>`,
    }),
  ],
};
