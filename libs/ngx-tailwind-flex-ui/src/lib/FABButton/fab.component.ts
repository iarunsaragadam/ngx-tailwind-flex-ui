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
  @Input() size = 'medium';
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
}
