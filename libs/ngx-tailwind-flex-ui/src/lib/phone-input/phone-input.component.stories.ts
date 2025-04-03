import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { PhoneNumberInputComponent } from './phone-input.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<PhoneNumberInputComponent> = {
  title: 'Components/PhoneInput',
  component: PhoneNumberInputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, PhoneNumberInputComponent],
    }),
  ],
  argTypes: {
    country: {
      control: 'text',
      description: 'Default selected country (ISO2 format)',
    },
    format: {
      control: 'select',
      options: ['e164', 'national', 'international'],
      description: 'Phone number format',
    },
    showCountryCode: {
      control: 'boolean',
      description: 'Show country code prefix',
    },
    showCountryFlag: {
      control: 'boolean',
      description: 'Show country flag prefix',
    },
    disableCountryDropdown: {
      control: 'boolean',
      description: 'Disable country selection dropdown',
    },
  },
};

export default meta;

type Story = StoryObj<PhoneNumberInputComponent>;

export const Default: Story = {
  args: {
    country: 'IN',
    format: 'e164',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-phone-input
        [(ngModel)]="phone"
        [country]="country"
        [format]="format">
      </lib-phone-input>
    `,
  }),
};

export const WithFlagAndCode: Story = {
  args: {
    showCountryFlag: true,
    showCountryCode: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-phone-input
        [(ngModel)]="phone"
        [showCountryFlag]="showCountryFlag"
        [showCountryCode]="showCountryCode">
      </lib-phone-input>
    `,
  }),
};

export const FixedCountry: Story = {
  args: {
    country: 'US',
    disableCountryDropdown: true,
    showCountryCode: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-phone-input
        [(ngModel)]="phone"
        [country]="country"
        [disableCountryDropdown]="disableCountryDropdown"
        [showCountryCode]="showCountryCode">
      </lib-phone-input>
    `,
  }),
};

export const NationalFormat: Story = {
  args: {
    country: 'GB',
    format: 'national',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-phone-input
        [(ngModel)]="phone"
        [country]="country"
        [format]="format">
      </lib-phone-input>
    `,
  }),
};
