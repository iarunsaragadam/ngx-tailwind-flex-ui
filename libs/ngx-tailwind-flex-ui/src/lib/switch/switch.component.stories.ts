import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SwitchComponent } from './switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Components/Switch',
  component: SwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [SwitchComponent], // ✅ Standalone components go here
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Default: Story = {
  args: {
    label: 'Dark Mode',
    checked: false,
    disabled: false,
    color: 'primary',
    size: 'md',
  },
};
