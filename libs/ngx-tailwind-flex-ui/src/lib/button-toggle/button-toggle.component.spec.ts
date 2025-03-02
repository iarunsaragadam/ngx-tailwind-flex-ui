import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonToggleComponent } from './button-toggle.component';

describe('ButtonToggleComponent', () => {
  let component: ButtonToggleComponent;
  let fixture: ComponentFixture<ButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonToggleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle state on click', () => {
    expect(component.toggled).toBeFalsy();
    component.toggle();
    expect(component.toggled).toBeTruthy();
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.toggle();
    expect(component.toggled).toBeFalsy();
  });
});
