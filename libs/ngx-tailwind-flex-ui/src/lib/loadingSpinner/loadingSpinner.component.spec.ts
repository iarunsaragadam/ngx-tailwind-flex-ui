import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loadingSpinner.component';
import { CommonModule } from '@angular/common';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an indeterminate spinner by default', () => {
    const spinner = fixture.nativeElement.querySelector('div');
    const svg = spinner.querySelector('svg');
    expect(spinner.getAttribute('role')).toBe('progressbar');
    expect(spinner.getAttribute('aria-label')).toBe('Loading');
    expect(svg.classList.contains('animate-spin')).toBeTruthy();
    expect(svg.style.width).toBe('40px');
    expect(svg.style.height).toBe('40px');
    const circles = svg.querySelectorAll('circle');
    expect(circles.length).toBe(2);
    expect(circles[0].style.stroke).toBe('#3b82f6');
    expect(circles[0].style.strokeWidth).toBe('4'); // Updated to expect "4"
  });

  it('should render a determinate spinner when mode is determinate', () => {
    component.mode = 'determinate';
    component.value = 50;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('div');
    const svg = spinner.querySelector('svg');
    expect(spinner.getAttribute('aria-valuenow')).toBe('50');
    expect(svg.classList.contains('animate-spin')).toBeFalsy();
    const circles = svg.querySelectorAll('circle');
    expect(circles[1].style.strokeDashoffset).toBe('125.6'); // 251.2 - (251.2 * 0.5)
  });

  it('should apply custom size', () => {
    component.size = 60;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('div');
    const svg = spinner.querySelector('svg');
    expect(spinner.style.width).toBe('60px');
    expect(spinner.style.height).toBe('60px');
    expect(svg.style.width).toBe('60px');
    expect(svg.style.height).toBe('60px');
  });

  it('should apply custom thickness', () => {
    component.thickness = 6;
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    const circles = svg.querySelectorAll('circle');
    expect(circles[0].style.strokeWidth).toBe('6'); // Updated to expect "6"
    expect(circles[1].style.strokeWidth).toBe('6'); // Updated to expect "6"
  });

  it('should apply custom color', () => {
    component.color = '#ff0000';
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    const circles = svg.querySelectorAll('circle');
    expect(circles[0].style.stroke).toMatch(/#ff0000|rgb\(255,\s*0,\s*0\)/);
    expect(circles[1].style.stroke).toMatch(/#ff0000|rgb\(255,\s*0,\s*0\)/);
  });

  it('should update determinate progress smoothly', () => {
    component.mode = 'determinate';
    component.value = 25;
    fixture.detectChanges();
    const circle = fixture.nativeElement.querySelector(
      'svg circle:nth-child(2)'
    );
    expect(parseFloat(circle.style.strokeDashoffset)).toBeCloseTo(188.4, 1); // 251.2 - (251.2 * 0.25)

    component.value = 75;
    fixture.detectChanges();
    expect(parseFloat(circle.style.strokeDashoffset)).toBeCloseTo(62.8, 1); // 251.2 - (251.2 * 0.75)
  });
});
