import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { SliderComponent } from './slider.component';

export default {
  title: 'Components/Slider',
  component: SliderComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  argTypes: {
    valueChange: { action: 'valueChange' },
    rangeChange: { action: 'rangeChange' },
  },
} as Meta<SliderComponent>;

const Template: StoryFn<Partial<SliderComponent>> = (args) => ({
  props: {
    ...args,
    valueChange: action('valueChange'),
    rangeChange: action('rangeChange'),
  },
});

export const SingleValue = Template.bind({});
SingleValue.args = { min: 0, max: 100, step: 5, value: 50, range: false };

export const RangeSlider = Template.bind({});
RangeSlider.args = { min: 10, max: 50, step: 5, value: 20, value2: 40, range: true };
