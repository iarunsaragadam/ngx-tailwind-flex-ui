import {
  ComponentFixture,
  TestBed,
  // fakeAsync,
  // tick,
} from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

class MockElementRef<T extends HTMLElement> {
  constructor(public nativeElement: T) {}
}

interface MockDOMElement {
  scrollIntoView: jest.Mock;
}

interface MockInputElement {
  focus: jest.Mock;
  value: string;
  disabled: boolean;
  type: string;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
  setAttribute: jest.Mock;
  getAttribute: jest.Mock;
}

function createMockInputElement(): MockInputElement {
  return {
    focus: jest.fn(),
    value: '',
    disabled: false,
    type: 'text',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
  } as unknown as MockInputElement;
}

function createMockDropdownElement(): HTMLElement {
  const mockOptions: MockDOMElement[] = [
    { scrollIntoView: jest.fn() },
    { scrollIntoView: jest.fn() },
    { scrollIntoView: jest.fn() },
  ];

  return {
    querySelectorAll: jest.fn((selector: string) => {
      return selector === 'li' ? mockOptions : [];
    }),
  } as unknown as HTMLElement;
}

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let mockDropdown: HTMLElement;
  let mockInput: MockInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ];
    component.placeholder = 'Select a color';

    mockDropdown = createMockDropdownElement();
    mockInput = createMockInputElement();

    // Set mocks after component creation but before detectChanges
    component.dropdown = new MockElementRef(mockDropdown);
    component.searchInput = new MockElementRef(
      mockInput as unknown as HTMLInputElement
    );

    jest.spyOn(component.selectionChange, 'emit');
    jest.spyOn(component.openedChange, 'emit');

    fixture.detectChanges();

    // Reassign mocks after detectChanges to ensure they persist
    component.dropdown = new MockElementRef(mockDropdown);
    component.searchInput = new MockElementRef(
      mockInput as unknown as HTMLInputElement
    );
  });

  // it('should open dropdown when clicked', fakeAsync(() => {
  //   const focusSpy = jest.spyOn(mockInput, 'focus');

  //   if (!component.searchInput) {
  //     throw new Error('searchInput should be defined in test setup');
  //   }
  //   expect(component.searchInput.nativeElement.focus).toBeDefined();

  //   component.toggleDropdown();
  //   fixture.detectChanges();
  //   tick(0); // Simulate setTimeout

  //   expect(component.isOpen).toBe(true);
  //   expect(component.openedChange.emit).toHaveBeenCalledWith(true);
  //   expect(focusSpy).toHaveBeenCalledTimes(1);
  // }));

  it('should close dropdown when clicked outside', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', {
      value: { closest: jest.fn(() => null) },
      writable: true,
    });

    document.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);
    expect(component.openedChange.emit).toHaveBeenCalledWith(false);
  });

  it('should filter options when typing', () => {
    component.isOpen = true;
    component.searchText = 'Blue';
    component.filterOptions();
    fixture.detectChanges();

    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].label).toBe('Blue');
  });

  it('should select an option', () => {
    component.isOpen = true;
    component.filteredOptions = [...component.options];
    const optionToSelect = component.options[1];

    component.selectOption(optionToSelect);
    fixture.detectChanges();

    expect(component.value).toBe(optionToSelect.value);
    expect(component.isOpen).toBe(false);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      optionToSelect.value
    );
  });

  it('should handle multiple selections', () => {
    component.multiple = true;
    component.isOpen = true;
    component.filteredOptions = [...component.options];
    fixture.detectChanges();

    component.selectOption(component.options[0]);
    component.selectOption(component.options[1]);
    fixture.detectChanges();

    expect(Array.isArray(component.value)).toBe(true);
    expect(component.value).toEqual(['red', 'blue']);
    expect(component.selectionChange.emit).toHaveBeenCalledWith([
      'red',
      'blue',
    ]);
    expect(component.isOpen).toBe(true);
  });

  it('should clear selection when clear icon is clicked', () => {
    component.value = 'blue';
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(
      By.css('.hover\\:text-red-500')
    );
    const event = new MouseEvent('click');
    jest.spyOn(event, 'stopPropagation');

    clearBtn.triggerEventHandler('click', event);
    fixture.detectChanges();

    expect(component.value).toBeNull();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.selectionChange.emit).toHaveBeenCalledWith(null);
  });

  it('should handle keyboard navigation - ArrowDown', () => {
    component.isOpen = true;
    component.filteredOptions = [...component.options];

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
    const mockElements = mockDropdown.querySelectorAll(
      'li'
    ) as unknown as MockDOMElement[];
    const scrollSpy = jest.spyOn(mockElements[0], 'scrollIntoView');

    if (!component.dropdown) {
      throw new Error('dropdown should be defined in test setup');
    }
    expect(mockDropdown.querySelectorAll('li')).toHaveLength(3);

    component.handleKeyboard(event);
    fixture.detectChanges();

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.focusedOptionIndex).toBe(0);
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
    });
  });

  it('should handle keyboard navigation - ArrowUp', () => {
    component.isOpen = true;
    component.filteredOptions = [...component.options];
    component.focusedOptionIndex = 1;

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
    const mockElements = mockDropdown.querySelectorAll(
      'li'
    ) as unknown as MockDOMElement[];
    const scrollSpy = jest.spyOn(mockElements[0], 'scrollIntoView');

    if (!component.dropdown) {
      throw new Error('dropdown should be defined in test setup');
    }
    expect(mockDropdown.querySelectorAll('li')).toHaveLength(3);

    component.handleKeyboard(event);
    fixture.detectChanges();

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.focusedOptionIndex).toBe(0);
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
    });
  });

  it('should select option on Enter key press', () => {
    component.isOpen = true;
    component.filteredOptions = [...component.options];
    component.focusedOptionIndex = 1;

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    component.handleKeyboard(event);
    fixture.detectChanges();

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.value).toBe('blue');
  });

  it('should close dropdown when Escape is pressed', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    fixture.debugElement.triggerEventHandler('keydown', event);
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);
  });

  it('should display selected option label', () => {
    component.value = 'blue';
    fixture.detectChanges();

    const selectedLabel = fixture.debugElement.query(By.css('.truncate'));
    expect(selectedLabel.nativeElement.textContent.trim()).toBe('Blue');
  });

  it('should display placeholder when no option is selected', () => {
    component.value = null;
    fixture.detectChanges();

    const placeholder = fixture.debugElement.query(By.css('.truncate'));
    expect(placeholder.nativeElement.textContent.trim()).toBe('Select a color');
  });

  it('should show no options found when filter returns empty', () => {
    component.isOpen = true;
    component.searchText = 'Yellow';
    component.filterOptions();
    fixture.detectChanges();

    const noOptions = fixture.debugElement.query(By.css('li.text-gray-500'));
    expect(component.filteredOptions.length).toBe(0);
    expect(noOptions.nativeElement.textContent.trim()).toBe('No options found');
  });

  it('should mark as invalid when required and no value selected', () => {
    component.required = true;
    component.value = null;
    component.markTouched();
    fixture.detectChanges();

    expect(component.isInvalid()).toBe(true);
    const errorMsg = fixture.debugElement.query(By.css('.text-red-500'));
    expect(errorMsg.nativeElement.textContent.trim()).toBe(
      'Selection required.'
    );
  });
});
