import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SelectComponent } from './select.component';
import { SelectOptionComponent } from './select-option.component';

// Test host component
@Component({
  standalone: true,
  imports: [SelectComponent, SelectOptionComponent, CommonModule],
  template: `
    <lib-select>
      <lib-select-option value="1" label="Option 1"></lib-select-option>
      <lib-select-option value="2" label="Option 2"></lib-select-option>
    </lib-select>
  `,
})
class TestHostComponent {}

jest.setTimeout(10000);

beforeAll(() => {
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  }
});

describe('SelectComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: SelectComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SelectComponent,
        SelectOptionComponent,
        TestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(
      By.directive(SelectComponent)
    ).componentInstance;
    fixture.detectChanges();
    tick();
  }));

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should have at least one test (sanity check)', () => {
    expect(true).toBe(true);
  });

  it('should toggle panel on trigger click', fakeAsync(() => {
    const trigger = fixture.debugElement.query(By.css('input'));
    expect(trigger).toBeTruthy();
    trigger.triggerEventHandler('click', new Event('click'));
    tick();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);

    trigger.triggerEventHandler('click', new Event('click'));
    tick();
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  }));

  it('should handle keyboard navigation', fakeAsync(() => {
    component.isOpen = true;
    component.focusedOptionIndex = -1;
    fixture.detectChanges();
    tick();

    expect(component.optionCount).toBe(2);
    expect(component.filteredOptions.length).toBe(2);

    const scrollSpy = jest.spyOn(HTMLElement.prototype, 'scrollIntoView');

    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.handleKeydown(downEvent);
    tick();
    fixture.detectChanges();

    expect(component.focusedOptionIndex).toBe(0);

    component.handleKeydown(downEvent);
    tick();
    fixture.detectChanges();
    expect(component.focusedOptionIndex).toBe(1);

    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    component.handleKeydown(upEvent);
    tick();
    fixture.detectChanges();
    expect(component.focusedOptionIndex).toBe(0);

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(enterEvent);
    tick();
    fixture.detectChanges();
    expect(component.value).toBe('1');
    expect(component.isOpen).toBe(false);

    scrollSpy.mockRestore();
  }));

  it('should work with ngModel', fakeAsync(() => {
    const option = component.firstOption;
    if (!option) {
      throw new Error('First option is undefined');
    }
    expect(option).toBeTruthy();
    expect(option.value).toBeDefined();

    component.writeValue('1');
    fixture.detectChanges();
    tick();
    expect(component.value).toBe('1');

    let newValue: string | string[] | null = null;
    component.registerOnChange((val: string | string[] | null) => {
      newValue = val;
    });

    component.selectOption(option);
    tick();
    fixture.detectChanges();
    expect(newValue).toBe('1');
  }));

  it('should filter options when searching', fakeAsync(() => {
    component.isOpen = true;
    fixture.detectChanges();
    tick();

    component.searchText = 'option 1';
    fixture.detectChanges();
    tick();

    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].label).toBe('Option 1');
  }));

  it('should handle multiple selection', fakeAsync(() => {
    component.multiple = true;
    fixture.detectChanges();
    tick();

    const options = component.optionsArray;
    expect(options.length).toBe(2);
    expect(options[0].value).toBeDefined();
    expect(options[1].value).toBeDefined();

    component.selectOption(options[0]);
    tick();
    fixture.detectChanges();
    expect(component.value).toEqual(['1']);

    component.selectOption(options[1]);
    tick();
    fixture.detectChanges();
    expect(component.value).toEqual(['1', '2']);

    component.selectOption(options[0]);
    tick();
    fixture.detectChanges();
    expect(component.value).toEqual(['2']);
  }));
});
