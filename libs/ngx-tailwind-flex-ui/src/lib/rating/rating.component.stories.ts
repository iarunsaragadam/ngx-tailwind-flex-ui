<<<<<<< HEAD
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
=======
import { Meta, StoryObj, StoryFn } from '@storybook/angular';
>>>>>>> 42e5b615c5d7a0dc50b88ad1287cb8682f0f462c
import { RatingComponent } from './rating.component';

const meta: Meta<RatingComponent> = {
  title: 'Components/Rating',
  component: RatingComponent,
  tags: ['autodocs'],
<<<<<<< HEAD
  decorators: [
    moduleMetadata({
      imports: [RatingComponent], // Standalone component must be imported
    }),
  ],
};
export default meta;

type Story = StoryObj<RatingComponent>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    allowHalf: false,
  },
  render: (args) => ({
    props: { ...args },
    template: '<lib-rating [value]="value" [max]="max" [allowHalf]="allowHalf" />',
  }),
};

=======
};

export default meta;

// ✅ Correct CSF v3 format for DefaultRating
type Story = StoryObj<RatingComponent>;

>>>>>>> 42e5b615c5d7a0dc50b88ad1287cb8682f0f462c
export const DefaultRating: Story = {
  args: {
    value: 3.5,
    max: 5,
    allowHalf: true,
  },
  render: (args) => ({
<<<<<<< HEAD
    props: { ...args },
    template: '<lib-rating [value]="value" [max]="max" [allowHalf]="allowHalf" />',
  }),
};
=======
    props: { ...args},
    template: `<lib-rating [value]="value" [max]="max" [allowHalf]="allowHalf"></lib-rating>`,
  }),
};

const Template: StoryFn<RatingComponent> = (args) => ({
  props: { ...args },
});

export const Default = Template.bind({});
Default.args = { value: 3, max: 5, allowHalf: false };
>>>>>>> 42e5b615c5d7a0dc50b88ad1287cb8682f0f462c
