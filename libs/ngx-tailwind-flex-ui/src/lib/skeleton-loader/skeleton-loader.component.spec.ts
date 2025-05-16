import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonLoaderComponent } from './skeleton-loader.component';
import { CommonModule } from '@angular/common';

describe('SkeletonLoaderComponent', () => {
  let component: SkeletonLoaderComponent;
  let fixture: ComponentFixture<SkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLoaderComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Type Tests
  it('should apply correct class for text type', () => {
    component.type = 'text';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.rounded')).toBeTruthy();
  });

  it('should apply correct class for circle type', () => {
    component.type = 'circle';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.rounded-full')).toBeTruthy();
  });

  it('should apply correct class for rounded type', () => {
    component.type = 'rounded';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.rounded-lg')).toBeTruthy();
  });

  // Animation Tests
  it('should apply pulse animation by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('should apply wave animation when specified', () => {
    component.animation = 'wave';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.animate-wave')).toBeTruthy();
  });

  // Layout Tests
  it('should render card layout with avatar when specified', () => {
    component.layout = 'card';
    component.showAvatar = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skeleton-card')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.rounded-full')).toBeTruthy();
  });

  it('should render avatar layout', () => {
    component.layout = 'avatar';
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.skeleton-avatar')
    ).toBeTruthy();
  });

  // Color Tests
  it('should apply custom color', () => {
    component.color = '#ff0000';
    fixture.detectChanges();
    const loader = fixture.nativeElement.querySelector('.skeleton-loader');
    expect(loader.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});
