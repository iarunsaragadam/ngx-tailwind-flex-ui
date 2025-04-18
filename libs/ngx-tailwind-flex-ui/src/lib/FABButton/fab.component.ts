import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FABItemComponent } from './FAB-item.component';

@Component({
  selector: 'lib-fab',
  standalone: true,
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css'],
  imports: [CommonModule, FABItemComponent]
})
export class FabComponent {
  @Input() icon = 'add';
  @Input() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-right';
  @Input() isMini = false;
  @Input() color = 'primary'; 
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() tooltip = 'Open FAB';

  @Output() actionClicked = new EventEmitter<void>();

  isSpeedDialOpen = false;

  toggleSpeedDial() {
    this.isSpeedDialOpen = !this.isSpeedDialOpen;
  }

  onActionClick() {
    this.actionClicked.emit();
    if (this.isMini) {
      this.toggleSpeedDial();
    }
  }

  // ✅ Add these below your existing methods
  get positionClass(): string {
    const positions: Record<string, string> = {
      'top-left': 'fixed top-0 left-0',
      'top-right': 'fixed top-0 right-0',
      'bottom-left': 'fixed bottom-0 left-0',
      'bottom-right': 'fixed bottom-0 right-0'
    };
    return positions[this.position] || 'fixed bottom-0 right-0';
  }

  get sizeClass(): string {
    const sizes: Record<string, string> = {
      small: 'w-12 h-12 text-base',
      medium: 'w-14 h-14 text-xl',
      large: 'w-16 h-16 text-2xl'
    };
    return sizes[this.size] || 'w-14 h-14 text-xl';
  }
}
