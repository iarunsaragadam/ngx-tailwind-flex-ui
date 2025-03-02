import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  template: `<button (click)="toggle()" [disabled]="disabled"><ng-content></ng-content></button>`,
  styles: []
})
export class ButtonToggleComponent {
  @Input() variant: 'primary' | 'accent' | 'outline' | 'text' = 'primary';
  @Input() disabled = false;
  @Input() additionalClasses = '';
  @Input() toggled = false;

  @HostBinding('class') get classes(): string {
    const baseClasses = 'px-4 py-2 font-semibold rounded-lg';
    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      accent: 'bg-green-500 text-white hover:bg-green-600',
      outline: 'border border-gray-500 text-gray-700 hover:bg-gray-100',
      text: 'text-blue-500 hover:underline',
    };
    const toggledClasses = this.toggled ? 'bg-gray-700 text-white' : '';
    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
    return `${baseClasses} ${variantClasses[this.variant]} ${toggledClasses} ${disabledClasses} ${this.additionalClasses}`.trim();
  }

  toggle(): void {
    if (!this.disabled) {
      this.toggled = !this.toggled;
    }
  }
}
