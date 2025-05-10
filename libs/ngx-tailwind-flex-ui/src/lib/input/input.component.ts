import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styles: [], // Tailwind only
})
export class InputComponent {
  @Input() variant: 'outline' | 'filled' = 'outline';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() state: 'default' | 'error' | 'success' = 'default';
  @Input() class = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() value: string | number | null = null;

  @HostBinding('class') get hostClasses() {
    const base = 'block w-full focus:outline-none transition-colors';
    const variantMap = {
      outline: 'bg-white border border-gray-300 focus:border-blue-500',
      filled: 'bg-gray-100 border border-transparent focus:border-blue-500',
    };
    const sizeMap = {
      sm: 'px-2 py-1 text-sm rounded',
      md: 'px-3 py-2 text-base rounded-md',
      lg: 'px-4 py-3 text-lg rounded-lg',
    };
    const stateMap = {
      default: '',
      error: 'border-red-500 focus:border-red-600',
      success: 'border-green-500 focus:border-green-600',
    };
    const disabled = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
    return `${base} ${variantMap[this.variant]} ${sizeMap[this.size]} ${stateMap[this.state]} ${disabled} ${this.class}`.trim();
  }
}
