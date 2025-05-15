import { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { moduleMetadata } from '@storybook/angular';
import { AccordionPanelComponent } from './accordion-panel.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [AccordionComponent, AccordionPanelComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    multi: {
      control: 'boolean',
      description: 'Allow multiple panels to be open',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const SingleExpansion: Story = {
  args: { multi: false },
  render: (args) => ({
    props: args,
    template: `
      <app-accordion [multi]="multi">
        <app-accordion-panel header="Section 1">
          <p>Content for section 1</p>
        </app-accordion-panel>
        <app-accordion-panel header="Section 2">
          <p>Content for section 2</p>
        </app-accordion-panel>
      </app-accordion>
    `,
  }),
};

export const MultiExpansion: Story = {
  args: { multi: true },
  render: (args) => ({
    props: args,
    template: `
      <app-accordion [multi]="multi">
        <app-accordion-panel header="Item A">
          <p>Content A</p>
        </app-accordion-panel>
        <app-accordion-panel header="Item B">
          <p>Content B</p>
        </app-accordion-panel>
      </app-accordion>
    `,
  }),
};
