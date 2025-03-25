import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {
  @Input() message = '';
  @Input() type: 'success' | 'warning' | 'error' | 'info' = 'info';
  @Input() duration = 5000;
  @Input() action?: string;
  @Input() dismissible = true;
  @Input() position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right' = 'bottom-center';
  isVisible = true;

  ngOnInit() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.isVisible = false;
      }, this.duration);
    }
  }

  close() {
    this.isVisible = false;
  }

  onAction() {
    console.log(`${this.action} clicked!`);
    this.close();
  }
}
