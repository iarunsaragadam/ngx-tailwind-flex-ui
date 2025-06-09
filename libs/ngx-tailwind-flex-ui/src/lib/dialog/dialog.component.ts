import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styles: [],
})
export class DialogComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() description = '';
  @Input() class = '';

  @Output() close = new EventEmitter<void>();

  @HostBinding('class') get hostClasses() {
    return this.open
      ? `fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${this.class}`
      : 'hidden';
  }

  onClose() {
    this.close.emit();
  }
}
