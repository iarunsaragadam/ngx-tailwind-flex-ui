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

  it('should display the correct icon', () => {
    component.name = 'search';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent.trim()).toBe('search');
  });

  it('should apply correct size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('text-2xl');
  });

  it('should apply custom color', () => {
    component.color = 'text-blue-500';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('text-blue-500');
  });
});
