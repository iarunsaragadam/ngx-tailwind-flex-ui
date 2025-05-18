import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA, DialogData } from './dialog.tokens';

@Component({
  template: `
    <div class="p-4">
      <h2 lib-dialog-title>Test Dialog</h2>
      <div lib-dialog-content>Test Content</div>
      <div lib-dialog-actions>
        <button (click)="dialogRef.close(false)">Cancel</button>
        <button (click)="dialogRef.close(true)">Confirm</button>
      </div>
    </div>
  `
})
class TestDialogComponent {
  constructor(
    public dialogRef: DialogRef<boolean>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}
}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRef: DialogRef;

  beforeEach(async () => {
    dialogRef = new DialogRef();

    await TestBed.configureTestingModule({
      imports: [CommonModule, DialogComponent, TestDialogComponent],
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper ARIA attributes', () => {
    const labelId = 'test-label';
    const descriptionId = 'test-description';
    
    component.ariaLabelledBy = labelId;
    component.ariaDescribedBy = descriptionId;
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('aria-labelledby')).toBe(labelId);
    expect(dialog.getAttribute('aria-describedby')).toBe(descriptionId);
  });

  it('should close on backdrop click when not disabled', () => {
    jest.spyOn(dialogRef, 'close');
    const backdrop = fixture.nativeElement.querySelector('.fixed.inset-0');
    
    backdrop.click();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should not close on backdrop click when disabled', () => {
    jest.spyOn(dialogRef, 'close');
    dialogRef.config.disableClose = true;
    const backdrop = fixture.nativeElement.querySelector('.fixed.inset-0');
    
    backdrop.click();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close on escape key when not disabled', () => {
    jest.spyOn(dialogRef, 'close');
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);
    
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should not close on escape key when disabled', () => {
    jest.spyOn(dialogRef, 'close');
    dialogRef.config.disableClose = true;
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);
    
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should stop event propagation on dialog click', () => {
    const dialog = fixture.nativeElement.querySelector('.relative');
    const event = new MouseEvent('click');
    jest.spyOn(event, 'stopPropagation');
    
    dialog.dispatchEvent(event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should have proper focus management', () => {
    const dialog = fixture.nativeElement.querySelector('.relative');
    expect(dialog.getAttribute('tabindex')).toBe('0');
  });

  it('should have proper dark mode support', () => {
    const dialog = fixture.nativeElement.querySelector('.relative');
    expect(dialog.classList.contains('dark:bg-gray-800')).toBe(true);
  });
}); 