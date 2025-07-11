import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styles: [], // No inline styles; Tailwind handles it
})
export class CheckboxComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() label = '';
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() class = ''; // Allow users to pass custom Tailwind classes

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() checkboxClick = new EventEmitter<Event>();

  onChange(event: Event) {
    this.checkedChange.emit((event.target as HTMLInputElement).checked);
  }

  onClick(event: Event) {
    this.checkboxClick.emit(event);
  }
}