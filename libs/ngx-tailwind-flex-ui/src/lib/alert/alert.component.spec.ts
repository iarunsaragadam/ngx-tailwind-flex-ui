import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Component, TemplateRef } from '@angular/core';
import '@testing-library/jest-dom';

@Component({
  standalone: true,
  imports: [AlertComponent],
  template: `
    <lib-alert
      [message]="message"
      [action]="action"
      [actionTemplate]="actionTemplate"
    >
      <ng-template #actionTemplate>
        <button class="custom-action" (click)="onAction()">
          Custom {{ action }}
        </button>
      </ng-template>
    </lib-alert>
  `,
})
class TestHostComponent {
  message = 'Test alert';
  action = 'Action';
  actionTemplate!: TemplateRef<unknown>;

  onAction() {
    console.log('Action clicked');
  }
}

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    AlertComponent['activeAlerts'] = [];
    await TestBed.configureTestingModule({
      imports: [AlertComponent, CommonModule, NoopAnimationsModule],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the message', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('.message');
    expect(messageElement.textContent.trim()).toBe('Test alert');
  });

  it('should apply correct type class', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'success';
    component.bypassDuplicateCheck = true;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement.classList).toContain('bg-green-100');
    expect(alertElement.classList).toContain('border-green-500');
    expect(alertElement.classList).toContain('text-green-800');
  });

  it('should display default icon based on type', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'success';
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.material-icons');
    expect(iconElement.textContent.trim()).toBe('check_circle');
    expect(iconElement.classList).toContain('text-green-600');
  });

  it('should display custom icon if provided', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'success';
    component.icon = 'star';
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.material-icons');
    expect(iconElement.textContent.trim()).toBe('star');
  });

  it('should apply custom icon color if provided', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'success';
    component.iconColor = 'text-purple-500';
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.material-icons');
    expect(iconElement.classList).toContain('text-purple-500');
    expect(iconElement.classList).not.toContain('text-green-600');
  });

  it('should apply custom class if provided', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    component.customClass = 'bg-purple-200 border-purple-500 text-purple-800';
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement.classList).toContain('bg-purple-200');
    expect(alertElement.classList).toContain('border-purple-500');
    expect(alertElement.classList).toContain('text-purple-800');
  });

  it('should stack multiple alerts vertically', fakeAsync(() => {
    const fixture1 = TestBed.createComponent(AlertComponent);
    const component1 = fixture1.componentInstance;
    component1.message = 'First alert';
    component1.position = 'top-right';
    component1.type = 'info';
    component1.duration = 0;
    fixture1.detectChanges();
    tick();

    const fixture2 = TestBed.createComponent(AlertComponent);
    const component2 = fixture2.componentInstance;
    component2.message = 'Second alert';
    component2.position = 'top-right';
    component2.type = 'info';
    component2.duration = 0;
    fixture2.detectChanges();
    tick();

    expect(component1.offset).toBe(0);
    expect(component2.offset).toBe(60);

    component1.close();
    tick();
    fixture1.destroy();
    tick();
    fixture2.detectChanges();
    expect(component2.offset).toBe(0);
  }));

  it('should not add duplicate alerts', fakeAsync(() => {
    const fixture1 = TestBed.createComponent(AlertComponent);
    const component1 = fixture1.componentInstance;
    component1.message = 'Duplicate alert';
    component1.position = 'top-right';
    component1.type = 'info';
    component1.duration = 0;
    fixture1.detectChanges();
    tick();

    const fixture2 = TestBed.createComponent(AlertComponent);
    const component2 = fixture2.componentInstance;
    component2.message = 'Duplicate alert';
    component2.position = 'top-right';
    component2.type = 'info';
    component2.duration = 0;
    fixture2.detectChanges();
    tick();

    expect(AlertComponent['activeAlerts'].length).toBe(1);
    expect(component2.isVisible).toBe(false);
  }));

  it('should apply slide animation when animation is set to slide', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    component.animation = 'slide';
    component.duration = 0;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement).toBeTruthy();
  });

  it('should pause timer on mouseenter and resume on mouseleave', fakeAsync(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    component.duration = 100;
    fixture.detectChanges();

    const alertDebugElement = fixture.debugElement.query(By.css('.alert'));

    const pauseSpy = jest.spyOn(component, 'pauseTimer');
    const resumeSpy = jest.spyOn(component, 'resumeTimer');

    tick(50);
    expect(component.isVisible).toBe(true);

    alertDebugElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    tick(100);
    expect(pauseSpy).toHaveBeenCalled();
    expect(component.isVisible).toBe(true);

    alertDebugElement.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    tick(100);
    expect(resumeSpy).toHaveBeenCalled();
    expect(component.isVisible).toBe(false);
  }));

  it('should close when dismissible button is activated with Enter key', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    component.dismissible = true;
    component.duration = 0;
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector(
      'button[aria-label="Close alert"]'
    );
    closeButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(component.isVisible).toBe(false);
  });

  it('should close when dismissible button is activated with Space key', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    component.dismissible = true;
    component.duration = 0;
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector(
      'button[aria-label="Close alert"]'
    );
    closeButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space' }));
    fixture.detectChanges();
    expect(component.isVisible).toBe(false);
  });

  it('should emit actionClicked when action button is activated with Enter key', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    component.action = 'Undo';
    component.duration = 0;
    const emitSpy = jest.spyOn(component.actionClicked, 'emit');
    fixture.detectChanges();
    const actionButton = fixture.nativeElement.querySelector(
      'button:not([aria-label="Close alert"])'
    );
    actionButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit actionClicked when action button is activated with Space key', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'info';
    component.action = 'Undo';
    component.duration = 0;
    const emitSpy = jest.spyOn(component.actionClicked, 'emit');
    fixture.detectChanges();
    const actionButton = fixture.nativeElement.querySelector(
      'button:not([aria-label="Close alert"])'
    );
    actionButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space' }));
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should throw error for invalid type', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    expect(() => {
      component.type = 'invalid-type' as
        | 'success'
        | 'error'
        | 'warning'
        | 'info';
    }).toThrowError(
      "Invalid type: invalid-type. Must be one of 'success', 'error', 'warning', 'info'."
    );
  });

  it('should throw error for invalid position', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.type = 'info';
    expect(() => {
      component.position = 'invalid-position' as
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right';
    }).toThrowError(
      "Invalid position: invalid-position. Must be one of 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'."
    );
  });

  it('should have correct ARIA attributes', () => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.message = 'Test alert';
    component.position = 'top-right';
    component.type = 'success';
    component.duration = 0;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector('.alert');
    expect(alertElement.getAttribute('role')).toBe('alert');
    expect(alertElement.getAttribute('aria-live')).toBe('polite');
    expect(alertElement.getAttribute('aria-label')).toBe(
      'success alert: Test alert'
    );

    component.message = 'Updated alert';
    component.type = 'error';
    fixture.detectChanges();
    expect(alertElement.getAttribute('aria-label')).toBe(
      'error alert: Updated alert'
    );
  });
});

describe('AlertComponent with Custom Action Template', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, CommonModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render custom action template if provided', fakeAsync(() => {
    testHost.message = 'Test alert';
    testHost.action = 'Action';
    fixture.detectChanges();
    tick();

    const customAction = fixture.nativeElement.querySelector('.custom-action');
    expect(customAction).toBeTruthy();
    expect(customAction.textContent.trim()).toBe('Custom Action');
  }));
});
