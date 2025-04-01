import { Meta, StoryObj } from '@storybook/angular';
import { DatepickerComponent } from './datepicker.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<DatepickerComponent> = {
  title: 'Components/Datepicker',
  component: DatepickerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    dateChange: { action: 'dateChange' },
    rangeChange: { action: 'rangeChange' },
  },
};
export default meta;

type Story = StoryObj<DatepickerComponent>;

export const SingleDate: Story = {
  args: {
    range: false,
  },
};

export const WithMinMax: Story = {
  args: {
    minDate: new Date('2024-03-01'),
    maxDate: new Date('2024-03-31'),
  },
};

export const WithDisabledDates: Story = {
  args: {
    disabledDates: [new Date('2024-03-15'), new Date('2024-03-20')],
  },
};

export const WithHolidays: Story = {
  args: {
    holidays: [new Date('2024-03-10'), new Date('2024-03-25')],
  },
};
