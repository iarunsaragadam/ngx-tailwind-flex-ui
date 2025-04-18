import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'lib-fab-item',
  templateUrl: './fab-item.component.html',
  standalone: true,
  styleUrls: ['./fab-item.component.css']
})
export class FABItemComponent {
  @Input() icon = 'add';
  @Output() itemClicked = new EventEmitter<void>();

  onItemClick() {
    this.itemClicked.emit();
  }
}
