import {
  Component,
  Input,
  ChangeDetectorRef,
  type OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css'],
})
export class DividerComponent implements OnChanges {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() inset = false;
  @Input() thickness = 1;
  @Input() color = '#d1d5db'; // Border color
  @Input() style: 'solid' | 'dashed' | 'dotted' = 'solid';
  @Input() text?: string;
  @Input() textColor = '#6b7280'; // Text color
  @Input() textSize = '1rem';
  @Input() textWeight = 'normal';
  @Input() length?: string;
  @Input() hoverEffect = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.cdr.detectChanges(); // Force change detection for input updates
  }
}
