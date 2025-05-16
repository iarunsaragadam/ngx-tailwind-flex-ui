import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css'],
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() type: 'text' | 'circle' | 'rect' | 'rounded' = 'rect';
  @Input() width = '100%';
  @Input() height = '16px';
  @Input() animation: 'pulse' | 'wave' | 'none' = 'pulse';
  @Input() color = '#e5e7eb'; // Default light gray
  @Input() layout: 'simple' | 'card' | 'avatar' = 'simple'; // New layout input
  @Input() showAvatar = false; // Toggle avatar in card/avatar layouts

  ngOnInit() {
    console.log('Initializing SkeletonLoader with inputs:', {
      type: this.type,
      width: this.width,
      height: this.height,
      animation: this.animation,
      color: this.color,
      layout: this.layout,
      showAvatar: this.showAvatar,
    });

    // Normalize inputs
    this.width = typeof this.width === 'string' ? this.width : '100%';
    this.height = typeof this.height === 'string' ? this.height : '16px';
    this.color = typeof this.color === 'string' ? this.color : '#e5e7eb';
  }

  get validatedTypeClass(): string {
    switch (this.type) {
      case 'circle':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-lg'; // Changed from 'rounded' to match test
      case 'text':
        return 'rounded'; // Changed from 'rounded-none' to match test
      case 'rect':
      default:
        return 'rounded-none';
    }
  }

  get validatedAnimationClass(): string {
    switch (this.animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'wave':
        return 'animate-wave';
      case 'none':
      default:
        return '';
    }
  }
}
