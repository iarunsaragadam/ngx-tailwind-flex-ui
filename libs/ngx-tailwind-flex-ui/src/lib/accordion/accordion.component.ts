import { Component, ContentChildren, QueryList, Input, AfterContentInit } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel.component';

@Component({
  selector: 'lib-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements AfterContentInit {
  @Input() multi = false;
  @ContentChildren(AccordionPanelComponent) panels!: QueryList<AccordionPanelComponent>;

  ngAfterContentInit() {
    this.panels.forEach((panel) => {
      panel.toggleCallback = (clickedPanel) => {
        if (!this.multi) {
          this.panels.forEach((p) => {
            if (p !== clickedPanel) {
              p.expanded = false;
            }
          });
        }
      };
    });
  }
}
