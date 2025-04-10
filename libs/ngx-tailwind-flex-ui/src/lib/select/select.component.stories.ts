import {
  Meta,
  StoryObj,
  applicationConfig,
  moduleMetadata,
} from '@storybook/angular';
import { SelectComponent } from './select.component';
import { SelectOptionComponent } from './select-option.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Components/Select',
  component: SelectComponent,
  decorators: [
    applicationConfig({
      providers: [],
    }),
    moduleMetadata({
      imports: [CommonModule, FormsModule, SelectOptionComponent],
    }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    options: { control: 'object' },
    selectionChange: { action: 'selectionChange' },
  },
  args: {
    placeholder: 'Select an option',
    disabled: false,
    multiple: false,
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
} as Meta<SelectComponent>;

export const Default: StoryObj<SelectComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <lib-select
        [placeholder]="placeholder"
        [disabled]="disabled"
        [multiple]="multiple"
        [options]="options"
        (selectionChange)="selectionChange($event)"
      >
        <lib-select-option *ngFor="let opt of options" [value]="opt.value" [label]="opt.label"></lib-select-option>
      </lib-select>
    `,
  }),
};

export const Multiple: StoryObj<SelectComponent> = {
  args: { multiple: true },
  render: (args) => ({
    props: args,
    template: `
      <lib-select
        [placeholder]="placeholder"
        [disabled]="disabled"
        [multiple]="multiple"
        [options]="options"
        (selectionChange)="selectionChange($event)"
      >
        <lib-select-option *ngFor="let opt of options" [value]="opt.value" [label]="opt.label"></lib-select-option>
      </lib-select>
    `,
  }),
};
