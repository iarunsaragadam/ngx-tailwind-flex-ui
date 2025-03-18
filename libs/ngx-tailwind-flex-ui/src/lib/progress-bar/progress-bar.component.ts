<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'lib-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  imports: [CommonModule],
})
export class ProgressBarComponent {
  /** Types: 'determinate' | 'indeterminate' | 'buffer' | 'query' */
  @Input() variant: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';

  /** Primary progress percentage (0-100) */
  @Input() progress = 80;

  /** Buffer progress (for buffer variant, 0-100) */
  @Input() bufferProgress = 100;

  /** Color options */
  @Input() color: 'primary' | 'secondary' | 'success' | 'error' = 'primary';

  @Input() class = ''; // Allow users to pass custom Tailwind classes

  

  private readonly colorMap = {
    primary: 'bg-blue-500', // Default
    secondary: 'bg-yellow-500',
    success: 'bg-green-500',
    error: 'bg-red-500', // Warning
  };

  /** Map color variants to Tailwind CSS classes */
  @HostBinding('class')
  get progressBarClass(): string {
    return this.colorMap[this.color] || 'bg-blue-500';
=======
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
>>>>>>> bf823cd (add progress bar)
  }
}
