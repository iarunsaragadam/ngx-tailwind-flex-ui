// button-toggle.component.ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-button-toggle',
  template: `<button (click)="toggle()" [disabled]="disabled">{{ state ? 'On' : 'Off' }}</button>`,
  styleUrls: ['./button-toggle.component.css']
})
export class ButtonToggleComponent {
  @Input() state = false;
  @Input() disabled = false;
  @Input() additionalClasses = '';

  @HostBinding('class') get classList(): string {
    const base = 'px-4 py-2 rounded font-medium transition';
    const activeClass = 'bg-green-600 text-white hover:bg-green-700';
    const inactiveClass = 'bg-gray-400 text-black hover:bg-gray-500';
    return `${base} ${this.state ? activeClass : inactiveClass} ${this.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${this.additionalClasses}`.trim();
  }

  toggle() {
    if (!this.disabled) {
      this.state = !this.state;
    }
  }
}
