import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AccordionPanelComponent } from "./accordion-panel.component";

describe("AccordionPanelComponent", () => {
    let component: AccordionPanelComponent;
    let fixture: ComponentFixture<AccordionPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccordionPanelComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(AccordionPanelComponent);
        component = fixture.componentInstance;
        component.header = 'Test Header';
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should toggle expanded state', () => {
        expect(component.expanded).toBeFalsy();
        component.toggle();
        expect(component.expanded).toBeTruthy();
    });
    it('should not toggle when disabled', () => {
        component.disabled = true;
        component.toggle();
        expect(component.expanded).toBeFalsy();
    });
});