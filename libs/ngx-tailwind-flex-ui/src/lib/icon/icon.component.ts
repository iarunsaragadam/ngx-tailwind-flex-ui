import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  @Input() name = 'home';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() color = 'text-gray-500';

  get sizePx(): number {
    const sizeMap: Record<string, number> = {
      sm: 16,
      md: 24,  // Default Material Icon size
      lg: 32,
      xl: 48,
    };
    return sizeMap[this.size] || sizeMap['md'];
  }

  get colorClass(): string {
    return this.color;
  }
}
