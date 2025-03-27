import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loadingSpinner.component.html',
  styleUrls: ['./loadingSpinner.component.css'],
})
export class LoadingSpinnerComponent {
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate'; // Loading state
  @Input() value = 0; // Progress value (0-100) for determinate mode
  @Input() size = 40; // Diameter in pixels
  @Input() thickness = 4; // Stroke width in pixels
  @Input() color = '#3b82f6'; // Default Tailwind blue-500
}
