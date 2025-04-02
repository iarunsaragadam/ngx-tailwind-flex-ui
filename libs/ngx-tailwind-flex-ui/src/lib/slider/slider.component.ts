import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'lib-slider',
  standalone: true, // ✅ Standalone component
  imports: [FormsModule, CommonModule], // ✅ Include CommonModule
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value = 100;
  @Input() range = false;
  @Input() value2?: number; // For range slider
  @Input() showLabels = true;

  @Output() valueChange = new EventEmitter<number>();
  @Output() rangeChange = new EventEmitter<[number, number]>();

  debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Handles single slider value change
   */
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.emitValueChange();
  }

  /**
   * Handles range slider value change
   */
  onRangeInput(event: Event, type: 'min' | 'max') {
    const target = event.target as HTMLInputElement;
    if (type === 'min') {
      this.value = Math.min(Number(target.value), this.value2 || this.max);
    } else {
      this.value2 = Math.max(Number(target.value), this.value);
    }
    this.emitRangeChange();
  }

  /**
   * Handles keyboard navigation for accessibility
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.range) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        this.value2 = Math.min((this.value2 || this.max) + this.step, this.max);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        this.value2 = Math.max((this.value2 || this.min) - this.step, this.min);
      }
      this.emitRangeChange();
    } else {
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        this.value = Math.min(this.value + this.step, this.max);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        this.value = Math.max(this.value - this.step, this.min);
      }
      this.emitValueChange();
    }
  }

  /**
   * Emits debounced single value changes
   */
  emitValueChange() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.valueChange.emit(this.value);
    }, 100);
  }

  /**
   * Emits debounced range value changes
   */
  emitRangeChange() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.rangeChange.emit([this.value, this.value2 || this.min]);
    }, 100);
  }
}




