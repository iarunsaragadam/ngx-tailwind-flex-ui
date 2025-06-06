import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-accordion-panel',
    standalone: true,
    templateUrl: './accordion-panel.component.html',
})
export class AccordionPanelComponent {
    @Input()  header = '';
    @Input() disabled = false;
    expanded = false;
    toggleCallback?: (panel: AccordionPanelComponent) => void;
    toggle() {
        if (this.disabled) return;
        this.expanded = !this.expanded;
        this.toggleCallback?.(this);
    }
}
