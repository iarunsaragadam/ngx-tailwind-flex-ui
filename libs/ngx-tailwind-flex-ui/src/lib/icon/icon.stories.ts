import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Icon name from Material Icons' },
    size: { 
      control: 'radio', 
      options: ['sm', 'md', 'lg', 'xl'], 
      description: 'Size of the icon' 
    },
    color: { control: 'text', description: 'Tailwind color classes' },
  },
};

export default meta;

type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 'md',
    color: 'text-gray-500',
  },
  render: (args) => ({
    props: args,
    template: `<lib-icon [name]="name" [size]="size" [color]="color"></lib-icon>`,
  }),
};

export const LargeRedIcon: Story = {
  args: {
    name: 'favorite',
    size: 'xl',
    color: 'text-red-500',
  },
  render: (args) => ({
    props: args,
    template: `<lib-icon [name]="name" [size]="size" [color]="color"></lib-icon>`,
  }),
};

export const SmallBlueIcon: Story = {
  args: {
    name: 'star',
    size: 'sm',
    color: 'text-blue-500',
  },
  render: (args) => ({
    props: args,
    template: `<lib-icon [name]="name" [size]="size" [color]="color"></lib-icon>`,
  }),
};
