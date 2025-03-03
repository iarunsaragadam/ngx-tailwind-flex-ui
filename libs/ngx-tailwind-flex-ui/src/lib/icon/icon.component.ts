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

  get sizeClass(): string {
    const sizeMap = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-2xl',
      xl: 'text-4xl',
    };
    return sizeMap[this.size] || sizeMap.md;
  }

  get colorClass(): string {
    return this.color;
  }
}
