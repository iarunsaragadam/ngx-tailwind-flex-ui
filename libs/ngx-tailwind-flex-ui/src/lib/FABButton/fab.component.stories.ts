import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
   import { CommonModule } from '@angular/common';
   import { FabComponent } from './fab.component';
   import { FABItemComponent } from './FAB-item.component';

   export default {
     title: 'Components/FAB',
     component: FabComponent,
     decorators: [
       moduleMetadata({
         imports: [CommonModule, FABItemComponent],
       }),
     ],
   } as Meta<FabComponent>;

   const Template: StoryFn<FabComponent> = (args) => ({
     props: args,
     template: `
       <lib-fab [size]="size" [color]="color" [position]="position" [icon]="icon" [tooltip]="tooltip">
         <lib-fab-item icon="add" tooltip="Add Item"></lib-fab-item>
       </lib-fab>
     `,
   });

   export const Default = Template.bind({});
   Default.args = {
     size: 'medium',
     color: 'primary',
     position: 'bottom-right',
     icon: 'menu',
     tooltip: 'Open FAB',
   };