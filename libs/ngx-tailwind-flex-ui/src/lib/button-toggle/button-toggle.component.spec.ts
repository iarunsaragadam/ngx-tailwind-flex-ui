import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonToggleComponent } from './button-toggle.component';

describe('ButtonToggleComponent', () => {
  let component: ButtonToggleComponent;
  let fixture: ComponentFixture<ButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonToggleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle state on click', () => {
    expect(component.toggled).toBeFalse();
    component.toggle();
    expect(component.toggled).toBeTrue();
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.toggle();
    expect(component.toggled).toBeFalse();
  });
});
