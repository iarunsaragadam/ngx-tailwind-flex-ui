import { Meta, StoryObj, ArgTypes } from '@storybook/angular';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

const meta: Meta<SkeletonLoaderComponent> & {
  argTypes: Partial<ArgTypes<SkeletonLoaderComponent>>;
} = {
  title: 'Components/SkeletonLoader',
  component: SkeletonLoaderComponent,
  argTypes: {
    type: { control: 'select', options: ['text', 'circle', 'rect', 'rounded'] },
    animation: { control: 'select', options: ['pulse', 'wave', 'none'] },
    color: { control: 'color' },
    width: { control: 'text' },
    height: { control: 'text' },
    layout: { control: 'select', options: ['simple', 'card', 'avatar'] },
    showAvatar: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<SkeletonLoaderComponent>;

// Existing Stories
export const Default: Story = {
  args: {
    type: 'rect',
    width: '100%',
    height: '100px',
    animation: 'pulse',
    color: '#e5e7eb',
    layout: 'simple',
  },
};

export const Circle: Story = {
  args: {
    type: 'circle',
    width: '40px',
    height: '40px',
    animation: 'wave',
    color: '#b0b0b0',
    layout: 'simple',
  },
};

export const Card: Story = {
  args: {
    layout: 'card',
    width: '300px',
    height: '140px',
    color: '#d3d3d3',
    showAvatar: true,
    animation: 'pulse',
  },
};

export const Avatar: Story = {
  args: {
    layout: 'avatar',
    width: '200px',
    height: '16px',
    color: '#a9a9a9',
    animation: 'pulse',
  },
};

// New Stories
export const TextLine: Story = {
  name: 'Text Line (Single Line Placeholder)',
  args: {
    type: 'text',
    width: '80%',
    height: '16px',
    animation: 'pulse',
    color: '#cccccc',
    layout: 'simple',
  },
};

export const ListItem: Story = {
  name: 'List Item (Avatar + Multi-line Text)',
  args: {
    layout: 'avatar',
    width: '300px',
    height: '16px',
    color: '#bbbbbb',
    animation: 'wave',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 16px;">
        <lib-skeleton-loader
          [layout]="layout"
          [width]="width"
          [height]="height"
          [color]="color"
          [animation]="animation"
        ></lib-skeleton-loader>
        <lib-skeleton-loader
          type="text"
          width="60%"
          height="12px"
          [animation]="animation"
          [color]="color"
          layout="simple"
          style="margin-top: 8px;"
        ></lib-skeleton-loader>
      </div>
    `,
  }),
};

export const Banner: Story = {
  name: 'Banner (Full-width Image Placeholder)',
  args: {
    type: 'rounded',
    width: '100%',
    height: '200px',
    animation: 'wave',
    color: '#e0e0e0',
    layout: 'simple',
  },
};

export const ContentBlock: Story = {
  name: 'Content Block (Text-heavy Layout)',
  args: {
    layout: 'simple',
    color: '#d9d9d9',
    animation: 'pulse',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 16px; max-width: 600px;">
        <lib-skeleton-loader
          type="text"
          width="40%"
          height="24px"
          [animation]="animation"
          [color]="color"
          [layout]="layout"
        ></lib-skeleton-loader>
        <lib-skeleton-loader
          type="text"
          width="100%"
          height="16px"
          [animation]="animation"
          [color]="color"
          [layout]="layout"
          style="margin-top: 12px;"
        ></lib-skeleton-loader>
        <lib-skeleton-loader
          type="text"
          width="90%"
          height="16px"
          [animation]="animation"
          [color]="color"
          [layout]="layout"
          style="margin-top: 8px;"
        ></lib-skeleton-loader>
        <lib-skeleton-loader
          type="text"
          width="70%"
          height="16px"
          [animation]="animation"
          [color]="color"
          [layout]="layout"
          style="margin-top: 8px;"
        ></lib-skeleton-loader>
      </div>
    `,
  }),
};
