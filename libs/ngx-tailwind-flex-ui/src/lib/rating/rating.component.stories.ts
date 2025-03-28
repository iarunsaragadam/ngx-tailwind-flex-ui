import { Meta, StoryObj, StoryFn } from '@storybook/angular';
import { RatingComponent } from './rating.component';

const meta: Meta<RatingComponent> = {
  title: 'Components/Rating',
  component: RatingComponent,
  tags: ['autodocs'],
};

export default meta;

// ✅ Correct CSF v3 format for DefaultRating
type Story = StoryObj<RatingComponent>;

export const DefaultRating: Story = {
  args: {
    value: 3.5,
    max: 5,
    allowHalf: true,
  },
  render: (args) => ({
    props: { ...args},
    template: `<lib-rating [value]="value" [max]="max" [allowHalf]="allowHalf"></lib-rating>`,
  }),
};

const Template: StoryFn<RatingComponent> = (args) => ({
  props: { ...args },
});

export const Default = Template.bind({});
Default.args = { value: 3, max: 5, allowHalf: false };
