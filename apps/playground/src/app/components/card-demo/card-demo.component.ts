// apps/playground/src/app/components/card-demo/card-demo.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@ngx-tailwind-flex-ui';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './card-demo.component.html',
})
export class CardDemoComponent {
  // Example of component configuration options
  cardVariants: ('default' | 'outlined' | 'elevated')[] = [
    'default',
    'outlined',
    'elevated',
  ];
  selectedVariant: 'default' | 'outlined' | 'elevated' = 'outlined';
}
