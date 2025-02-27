import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  templateUrl: './button.component.html',
  styles: [], // No inline styles; Tailwind handles it
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'accent' | 'outline' | 'text' = 'primary';
  @Input() disabled = false;
  @Input() class = ''; // Allow users to pass custom Tailwind classes

  @HostBinding('class') get hostClasses() {
    const baseClasses =
      'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200';
    const variantClasses = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      accent:
        'bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
      outline:
        'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      text: 'text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    };
    const disabledClasses = this.disabled
      ? 'opacity-50 cursor-not-allowed'
      : '';

    return `${baseClasses} ${variantClasses[this.variant]} ${disabledClasses} ${
      this.class
    }`.trim();
  }
}
