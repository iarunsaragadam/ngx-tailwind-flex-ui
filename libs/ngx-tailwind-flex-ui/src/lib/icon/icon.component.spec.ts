import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, IconComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct icon name', () => {
    component.name = 'search';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent.trim()).toBe('search');
  });

  it('should apply correct font size based on size input', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');

    expect(span.style.fontSize).toBe('32px');
  });

  it('should apply correct font size for xl', () => {
    component.size = 'xl';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');

    expect(span.style.fontSize).toBe('48px');
  });

  it('should apply custom color class', () => {
    component.color = 'text-blue-500';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');

    expect(span.classList).toContain('text-blue-500');
  });
});
