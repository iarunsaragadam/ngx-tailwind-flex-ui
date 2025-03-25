import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message', () => {
    component.message = 'Test alert';
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('.message');
    expect(messageElement.textContent.trim()).toBe('Test alert');
  });

  it('should apply correct type class', () => {
    component.type = 'success';
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement.classList).toContain('bg-green-100');
  });

  it('should hide after duration', (done) => {
    component.duration = 100;
    component.ngOnInit();
    setTimeout(() => {
      expect(component.isVisible).toBeFalsy();
      done();
    }, 150);
  });

  it('should close when dismissible button is clicked', () => {
    component.dismissible = true;
    component.isVisible = true;
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector(
      'button[aria-label="Close alert"]'
    );
    closeButton.click();
    expect(component.isVisible).toBeFalsy();
  });

  it('should display action button when provided', () => {
    component.action = 'Undo';
    fixture.detectChanges();
    const actionButton = fixture.nativeElement.querySelector(
      'button:not([aria-label])'
    );
    expect(actionButton.textContent.trim()).toBe('Undo');
  });

  it('should apply correct position class', () => {
    component.position = 'top-right';
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement.classList).toContain('top-4');
    expect(alertElement.classList).toContain('right-4');
  });
});
