import { Component, Input,  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styles: [],
  imports: [CommonModule],
})
export class ProgressBarComponent {
  @Input() mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';
  @Input() value = 0; // Current progress value
  @Input() bufferValue = 100; // Buffer progress value (for buffer mode)
  @Input() min = 0; // Minimum progress value
  @Input() max = 100; // Maximum progress value
  @Input() class = ''; // Additional Tailwind classes

  get progressWidth(): string {
    if (this.mode === 'indeterminate' || this.mode === 'query') return '100%';
    if (this.max === this.min) return '0%'; // Prevent division by zero
    const clampedValue = Math.max(this.min, Math.min(this.value, this.max));
    return `${((clampedValue - this.min) / (this.max - this.min)) * 100}%`;
  }

  get bufferWidth(): string {
    if (this.mode !== 'buffer') return '0%';
    if (this.max === this.min) return '100%';
    const clampedBuffer = Math.max(this.min, Math.min(this.bufferValue, this.max));
    return `${((clampedBuffer - this.min) / (this.max - this.min)) * 100}%`;
  }
}
