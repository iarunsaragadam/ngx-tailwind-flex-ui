import { Meta, Story } from '@storybook/angular';
import { ButtonToggleComponent } from './button-toggle.component';

export default {
  title: 'Components/Button Toggle',
  component: ButtonToggleComponent,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'accent', 'outline', 'text'] }
    },
    disabled: { control: 'boolean' },
    toggled: { control: 'boolean' }
  }
} as Meta;

const Template: Story<ButtonToggleComponent> = (args: ButtonToggleComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Accent = Template.bind({});
Accent.args = {
  variant: 'accent',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
