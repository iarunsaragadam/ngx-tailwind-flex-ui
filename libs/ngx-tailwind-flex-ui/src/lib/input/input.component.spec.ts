import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct variant class', () => {
    component.variant = 'filled';
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('bg-gray-100');
  });

  it('should apply disabled class', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('opacity-50');
  });
});
