import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PininputComponent } from './pininput.component';
import { CommonModule } from '@angular/common';  // ✅ Add this
import { FormsModule } from '@angular/forms';  // ✅ Add this

const meta: Meta<PininputComponent> = {
  title: 'Components/PinInput',
  component: PininputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, PininputComponent], // ✅ Fix import references
    }),
  ],
};

export default meta;

type Story = StoryObj<PininputComponent>;

export const DefaultPinInput: Story = {
  args: {
    length: 6,
    type: 'number',
    autoSubmit: false,
  },
  render: (args) => ({
    props: args,
    template: `<lib-otp-input [length]="6" [type]="'number'" (completed)="verifyOtp($event)"></lib-otp-input>`,
  }),
};