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
    searchThreshold: {
      control: 'number',
      description: 'Show search when options >= this number (null for always)',
    },
    loading: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    options: { control: 'object' },
    selectionChange: { action: 'selectionChange' },
  },
  args: {
    placeholder: 'Select an option',
    disabled: false,
    multiple: false,
    loading: false,
    isOpen: true,
    searchThreshold: 10,
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
        [(isOpen)]="isOpen"
        (selectionChange)="selectionChange($event)"
      >
        <lib-select-option *ngFor="let opt of options" [value]="opt.value" [label]="opt.label"></lib-select-option>
      </lib-select>
    `,
  }),
};

export const Multiple: StoryObj<SelectComponent> = {
  args: {
    multiple: true,
    searchThreshold: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-select
        [placeholder]="placeholder"
        [disabled]="disabled"
        [multiple]="multiple"
        [options]="options"
        [(isOpen)]="isOpen"
        (selectionChange)="selectionChange($event)"
      >
        <lib-select-option *ngFor="let opt of options" [value]="opt.value" [label]="opt.label"></lib-select-option>
      </lib-select>
    `,
  }),
};

export const Search: StoryObj<SelectComponent> = {
  args: {
    searchThreshold: null,
    options: [
      { value: '1', label: 'Apple' },
      { value: '2', label: 'Banana' },
      { value: '3', label: 'Orange' },
      { value: '4', label: 'Mango' },
      { value: '5', label: 'Grapes' },
      { value: '6', label: 'Pineapple' },
      { value: '7', label: 'Watermelon' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-select
        [placeholder]="placeholder"
        [disabled]="disabled"
        [multiple]="multiple"
        [searchThreshold]="searchThreshold"
        [options]="options"
        [(isOpen)]="isOpen"
        (selectionChange)="selectionChange($event)"
      >
        <lib-select-option *ngFor="let opt of options" [value]="opt.value" [label]="opt.label"></lib-select-option>
      </lib-select>
    `,
  }),
};

export const Loading: StoryObj<SelectComponent> = {
  args: {
    loading: true,
    isOpen: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-select
        [placeholder]="placeholder"
        [disabled]="disabled"
        [multiple]="multiple"
        [options]="options"
        [loading]="loading"
        [(isOpen)]="isOpen"
        (selectionChange)="selectionChange($event)"
      >
        <lib-select-option *ngFor="let opt of options" [value]="opt.value" [label]="opt.label"></lib-select-option>
      </lib-select>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    // Wait for initial render
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Force change detection to ensure loading state is applied
    const component = canvasElement.querySelector('lib-select');
    if (component) {
      component.dispatchEvent(new Event('change')); // Trigger change detection
    }

    // Simulate loading delay and update
    await new Promise((resolve) => setTimeout(resolve, 3500)); // Wait 3.5 seconds to see both states
    args.loading = false;

    // Force re-render
    if (component) {
      component.dispatchEvent(new Event('change'));
    }
  },
};

export const Disabled: StoryObj<SelectComponent> = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-select
        [placeholder]="placeholder"
        [disabled]="disabled"
        [multiple]="multiple"
        [options]="options"
        [(isOpen)]="isOpen"
        (selectionChange)="selectionChange($event)"
      >
        <lib-select-option *ngFor="let opt of options" [value]="opt.value" [label]="opt.label"></lib-select-option>
      </lib-select>
    `,
  }),
};
