import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SliderComponent], // ✅ Correctly importing `SliderComponent`
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on input change', () => {
    const inputElement = document.createElement('input');
    inputElement.value = '30';

    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: inputElement });

    component.onInput(event);
    fixture.detectChanges(); // Ensure UI updates

    expect(component.value).toBe(30);
  });

  it('should correctly handle range input (min)', () => {
    component.value = 10;
    component.value2 = 40; // Ensure `value2` is set

    const inputElement = document.createElement('input');
    inputElement.value = '20';

    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: inputElement });

    component.onRangeInput(event, 'min');
    fixture.detectChanges();

    expect(component.value).toBe(20);
  });

  it('should correctly handle range input (max)', () => {
    component.value = 10;
    component.value2 = 40;

    const inputElement = document.createElement('input');
    inputElement.value = '50';

    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: inputElement });

    component.onRangeInput(event, 'max');
    fixture.detectChanges();

    expect(component.value2).toBe(50);
  });

  it('should emit valueChange on input change', fakeAsync(() => {
    const spy = jest.spyOn(component.valueChange, 'emit'); // ✅ Corrected spy method for Jest

    const inputElement = document.createElement('input');
    inputElement.value = '60';

    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: inputElement });

    component.onInput(event);
    fixture.detectChanges();

    tick(100); // ✅ Wait for debounce time
    expect(spy).toHaveBeenCalledWith(60);
  }));

  it('should emit rangeChange on range input change', fakeAsync(() => {
    const spy = jest.spyOn(component.rangeChange, 'emit'); // ✅ Corrected spy method for Jest

    component.value = 10;
    component.value2 = 40;

    const inputElement = document.createElement('input');
    inputElement.value = '25';

    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: inputElement });

    component.onRangeInput(event, 'min');
    fixture.detectChanges();

    tick(100); // ✅ Wait for debounce time
    expect(spy).toHaveBeenCalledWith([25, 40]);
  }));
});
