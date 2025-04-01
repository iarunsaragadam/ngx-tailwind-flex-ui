import { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

// Define the interface for the StackedAlerts story with flat properties
interface StackedAlertsArgs {
  firstMessage: string;
  firstType: 'success' | 'error' | 'warning' | 'info';
  firstAction: string | null;
  firstDismissible: boolean;
  firstIcon: string | null;
  firstDuration: number;
  firstAnimation: 'fade' | 'slide';
  firstPosition:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

  secondMessage: string;
  secondType: 'success' | 'error' | 'warning' | 'info';
  secondAction: string | null;
  secondDismissible: boolean;
  secondIcon: string | null;
  secondDuration: number;
  secondAnimation: 'fade' | 'slide';
  secondPosition:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

  thirdMessage: string;
  thirdType: 'success' | 'error' | 'warning' | 'info';
  thirdAction: string | null;
  thirdDismissible: boolean;
  thirdIcon: string | null;
  thirdDuration: number;
  thirdAnimation: 'fade' | 'slide';
  thirdPosition:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
}

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  args: {},
  argTypes: {
    message: { control: 'text' },
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
    },
    duration: { control: 'number' },
    action: { control: 'text' },
    dismissible: { control: 'boolean' },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    icon: {
      control: 'select',
      options: [
        '',
        'pizza',
        'mood',
        'star',
        'favorite',
        'thumb_up',
        'lightbulb',
        'coffee',
        'cloud',
        'music_note',
        'pets',
        'rocket',
        'beach_access',
      ],
    },
    animation: { control: 'select', options: ['fade', 'slide'] },
  },
};

export default meta;

type Story = StoryObj<AlertComponent>;

export const BasicSnackBar: Story = {
  args: {
    message: 'Disco party!',
    type: 'info',
    action: 'Dance',
    duration: 5000,
    position: 'bottom-center',
  },
};

export const ConfigurablePosition: Story = {
  args: {
    message: 'Pool party!',
    type: 'info',
    duration: 5000,
    position: 'bottom-right',
  },
};

export const DismissibleError: Story = {
  args: {
    message: 'Something went wrong',
    type: 'error',
    dismissible: true,
    duration: 0,
    position: 'top-right',
  },
};

export const SuccessWithAction: Story = {
  args: {
    message: 'Data saved successfully',
    type: 'success',
    action: 'Undo',
    duration: 3000,
    position: 'bottom-center',
  },
};

export const WarningWithCustomIcon: Story = {
  args: {
    message: 'Custom icon alert',
    type: 'warning',
    icon: 'star',
    dismissible: true,
    duration: 5000,
    position: 'top-center',
  },
};

export const StackedAlerts: StoryObj<AlertComponent & StackedAlertsArgs> = {
  render: (args: StackedAlertsArgs) => ({
    props: args,
    template: `
      <lib-alert
        [message]="firstMessage"
        [type]="firstType"
        [action]="firstAction"
        [dismissible]="firstDismissible"
        [icon]="firstIcon"
        [duration]="firstDuration"
        [animation]="firstAnimation"
        [position]="firstPosition"
        [bypassDuplicateCheck]="true"
      ></lib-alert>
      <lib-alert
        [message]="secondMessage"
        [type]="secondType"
        [action]="secondAction"
        [dismissible]="secondDismissible"
        [icon]="secondIcon"
        [duration]="secondDuration"
        [animation]="secondAnimation"
        [position]="secondPosition"
        [bypassDuplicateCheck]="true"
      ></lib-alert>
      <lib-alert
        [message]="thirdMessage"
        [type]="thirdType"
        [action]="thirdAction"
        [dismissible]="thirdDismissible"
        [icon]="thirdIcon"
        [duration]="thirdDuration"
        [animation]="thirdAnimation"
        [position]="thirdPosition"
        [bypassDuplicateCheck]="true"
      ></lib-alert>
    `,
  }),
  args: {
    firstMessage: 'First alert',
    firstType: 'success',
    firstAction: null,
    firstDismissible: true,
    firstIcon: 'star',
    firstDuration: 50000,
    firstAnimation: 'slide',
    firstPosition: 'top-right',

    secondMessage: 'Second alert',
    secondType: 'warning',
    secondAction: null,
    secondDismissible: true,
    secondIcon: null,
    secondDuration: 50000,
    secondAnimation: 'slide',
    secondPosition: 'top-right',

    thirdMessage: 'Third alert',
    thirdType: 'error',
    thirdAction: null,
    thirdDismissible: true,
    thirdIcon: null,
    thirdDuration: 50000,
    thirdAnimation: 'slide',
    thirdPosition: 'top-right',
  } as StackedAlertsArgs,
  argTypes: {
    // First Alert Controls
    firstMessage: {
      control: { type: 'text', disable: false },
      name: 'First Alert Message',
    },
    firstType: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      name: 'First Alert Type',
    },
    firstAction: {
      control: { type: 'text', disable: false },
      name: 'First Alert Action',
    },
    firstDismissible: { control: 'boolean', name: 'First Alert Dismissible' },
    firstIcon: {
      control: 'select',
      options: [
        '',
        'pizza',
        'mood',
        'star',
        'favorite',
        'thumb_up',
        'lightbulb',
        'coffee',
        'cloud',
        'music_note',
        'pets',
        'rocket',
        'beach_access',
      ],
      name: 'First Alert Icon',
    },
    firstDuration: { control: 'number', name: 'First Alert Duration' },
    firstAnimation: {
      control: 'select',
      options: ['fade', 'slide'],
      name: 'First Alert Animation',
    },
    firstPosition: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      name: 'First Alert Position',
    },

    // Second Alert Controls
    secondMessage: {
      control: { type: 'text', disable: false },
      name: 'Second Alert Message',
    },
    secondType: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      name: 'Second Alert Type',
    },
    secondAction: {
      control: { type: 'text', disable: false },
      name: 'Second Alert Action',
    },
    secondDismissible: { control: 'boolean', name: 'Second Alert Dismissible' },
    secondIcon: {
      control: 'select',
      options: [
        '',
        'pizza',
        'mood',
        'star',
        'favorite',
        'thumb_up',
        'lightbulb',
        'coffee',
        'cloud',
        'music_note',
        'pets',
        'rocket',
        'beach_access',
      ],
      name: 'Second Alert Icon',
    },
    secondDuration: { control: 'number', name: 'Second Alert Duration' },
    secondAnimation: {
      control: 'select',
      options: ['fade', 'slide'],
      name: 'Second Alert Animation',
    },
    secondPosition: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      name: 'Second Alert Position',
    },

    // Third Alert Controls
    thirdMessage: {
      control: { type: 'text', disable: false },
      name: 'Third Alert Message',
    },
    thirdType: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      name: 'Third Alert Type',
    },
    thirdAction: {
      control: { type: 'text', disable: false },
      name: 'Third Alert Action',
    },
    thirdDismissible: { control: 'boolean', name: 'Third Alert Dismissible' },
    thirdIcon: {
      control: 'select',
      options: [
        '',
        'pizza',
        'mood',
        'star',
        'favorite',
        'thumb_up',
        'lightbulb',
        'coffee',
        'cloud',
        'music_note',
        'pets',
        'rocket',
        'beach_access',
      ],
      name: 'Third Alert Icon',
    },
    thirdDuration: { control: 'number', name: 'Third Alert Duration' },
    thirdAnimation: {
      control: 'select',
      options: ['fade', 'slide'],
      name: 'Third Alert Animation',
    },
    thirdPosition: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      name: 'Third Alert Position',
    },

    // Remove inherited fields that are not used in this story
    message: { table: { disable: true } },
    type: { table: { disable: true } },
    duration: { table: { disable: true } },
    action: { table: { disable: true } },
    dismissible: { table: { disable: true } },
    position: { table: { disable: true } },
    icon: { table: { disable: true } },
    animation: { table: { disable: true } },
  },
};
