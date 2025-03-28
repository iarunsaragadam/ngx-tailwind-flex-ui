import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { CommonModule } from '@angular/common';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct progress width in determinate mode', () => {
    component.mode = 'determinate';
    component.value = 50;
    component.min = 0;
    component.max = 100;
    fixture.detectChanges();
    expect(component.progressWidth).toBe('50%');
  });

  it('should have correct buffer width in buffer mode', () => {
    component.mode = 'buffer';
    component.bufferValue = 80;
    component.min = 0;
    component.max = 100;
    fixture.detectChanges();
    expect(component.bufferWidth).toBe('80%');
  });

  it('should have full width in indeterminate mode', () => {
    component.mode = 'indeterminate';
    fixture.detectChanges();
    expect(component.progressWidth).toBe('100%');
  });
});
