// card.component.ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() variant: 'default' | 'outlined' | 'shadowed' | 'interactive' = 'default';
  @Input() additionalClasses = '';

  @HostBinding('class') get classList(): string {
    const base = 'p-4 rounded-lg transition';
    const variantClasses = {
      default: 'bg-white border border-gray-200',
      outlined: 'border border-gray-300 bg-transparent',
      shadowed: 'shadow-lg bg-white border border-gray-100',
      interactive: 'hover:shadow-xl cursor-pointer bg-white border border-gray-200'
    };
    return `${base} ${variantClasses[this.variant]} ${this.additionalClasses}`.trim();
  }
}
