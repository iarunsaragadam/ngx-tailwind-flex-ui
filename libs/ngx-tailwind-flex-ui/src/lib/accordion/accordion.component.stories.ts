import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-panel.component';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AccordionComponent, AccordionPanelComponent], // Standalone components must be imported
    }),
  ],
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
      <lib-accordion [multi]="multi">
        <lib-accordion-panel header="Section 1">
          <p>Content for section 1</p>
        </lib-accordion-panel>
        <lib-accordion-panel header="Section 2">
          <p>Content for section 2</p>
        </lib-accordion-panel>
      </lib-accordion>
    `,
  }),
};

export const MultiExpansion: Story = {
  args: { multi: true },
  render: (args) => ({
    props: args,
    template: `
      <lib-accordion [multi]="multi">
        <lib-accordion-panel header="Item A">
          <p>Content A</p>
        </lib-accordion-panel>
        <lib-accordion-panel header="Item B">
          <p>Content B</p>
        </lib-accordion-panel>
      </lib-accordion>
    `,
  }),
};
