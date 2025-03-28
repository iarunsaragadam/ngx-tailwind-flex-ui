import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-chip',
  standalone: true,
  templateUrl: './chip.component.html',
  styles: [],
  imports: [CommonModule],
})
export class ChipComponent {
  @Input() color: 'primary' | 'secondary' | 'accent' | 'neutral' = 'primary';
  @Input() variant: 'filled' | 'outlined' = 'filled';
  @Input() removable = false;
  @Input() clickable = false;
  @Input() disabled = false;
  @Input() selected = false;
  @Input() icon: string | null = null;

  @Output() removed = new EventEmitter<void>();
  @Output() clicked = new EventEmitter<void>();
  @Output() selectedChange = new EventEmitter<boolean>();

  @HostBinding('class') get hostClasses() {
    const baseClasses =
      'inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2';

    const colorClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-purple-600 text-white hover:bg-purple-700',
      accent: 'bg-green-500 text-white hover:bg-green-600',
      neutral: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    };

    const outlinedClasses = {
      primary: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
      secondary: 'border border-purple-600 text-purple-600 hover:bg-purple-100',
      accent: 'border border-green-500 text-green-500 hover:bg-green-100',
      neutral: 'border border-gray-300 text-gray-600 hover:bg-gray-100',
    };

    const selectedClasses = this.selected ? 'ring-2 ring-blue-500' : '';
    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${this.variant === 'filled' ? colorClasses[this.color] : outlinedClasses[this.color]} ${selectedClasses} ${disabledClasses}`.trim();
  }

  onRemove(event: Event) {
    event.stopPropagation(); // Prevent click event on chip when clicking remove button
    if (!this.disabled) {
      console.log('Chip removed event emitted'); // ✅ Debugging
      this.removed.emit();
    }
  }

  onClick() {
    if (this.clickable && !this.disabled) {
      console.log('Chip clicked event emitted'); // ✅ Debugging
      this.clicked.emit();
      this.toggleSelection();
    }
  }

  toggleSelection() {
    if (!this.disabled) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  }

  onKeydown(event: KeyboardEvent) {
    console.log('Key pressed:', event.key); // ✅ Debugging log

    if (event.key === 'Enter' || event.key === ' ') {
      this.onClick();
    }

    if (event.key === 'Escape' && this.selected) {
      this.selected = false;
      this.selectedChange.emit(this.selected);
    }

    if ((event.key === 'Backspace' || event.key === 'Delete') && this.removable) {
      event.preventDefault(); // ✅ Prevents default browser behavior
      console.log('Backspace/Delete pressed - Removing chip'); // ✅ Debugging log
      this.onRemove(event);
    }
  }
}
