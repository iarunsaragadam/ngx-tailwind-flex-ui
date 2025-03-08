import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styles: [], // No inline styles; Tailwind handles it
})
export class CardComponent {
  @Input() variant: 'default' | 'outlined' | 'elevated' = 'default';
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() rounded: 'none' | 'small' | 'medium' | 'large' | 'full' = 'medium';
  @Input() class = ''; // Allow users to pass custom Tailwind classes

  @HostBinding('class') get hostClasses() {
    // Base classes
    const baseClasses = 'block overflow-hidden';

    // Variant classes
    const variantClasses = {
      default: 'bg-white',
      outlined: 'bg-white border border-gray-200',
      elevated: 'bg-white shadow-md',
    };

    // Padding classes
    const paddingClasses = {
      none: 'p-0',
      small: 'p-2',
      medium: 'p-4',
      large: 'p-6',
    };

    // Rounded classes
    const roundedClasses = {
      none: 'rounded-none',
      small: 'rounded-sm',
      medium: 'rounded',
      large: 'rounded-lg',
      full: 'rounded-full',
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${
      paddingClasses[this.padding]
    } ${roundedClasses[this.rounded]} ${this.class}`.trim();
  }
}
