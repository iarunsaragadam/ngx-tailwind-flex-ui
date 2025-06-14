import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'lib-divider',
  standalone: true,
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css'],
})
export class DividerComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  /** Additional Tailwind CSS classes for customization */
  @Input() className = '';

  @HostBinding('class')
  get hostClasses(): string {
    const base = 'bg-gray-300';
    const orientClass =
      this.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full';
    return `${base} ${orientClass} ${this.className}`.trim();
  }

  @HostBinding('attr.role') role = 'separator';
  @HostBinding('attr.aria-orientation')
  get ariaOrientation(): string {
    return this.orientation;
  }
}
