import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectorRef,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectOptionComponent } from './select-option.component';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SelectOptionComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit {
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() required = false;
  @Input() panelClass = '';
  @Input() tabIndex = 0;
  @Input() ariaLabel = '';
  @Input() ariaLabelledby = '';
  @Input() options: { value: string | number; label: string }[] = [];

  @Output() openedChange = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<string | string[] | null>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('panel') panel!: ElementRef;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  @ContentChildren(SelectOptionComponent)
  private optionsQueryList!: QueryList<SelectOptionComponent>;

  isOpen = false;
  searchText = '';
  focusedOptionIndex = -1;
  private _value: string | string[] | null = null;
  private _onChange: (value: string | string[] | null) => void = () => {
    // Initial placeholder - overridden by registerOnChange
  };
  private _onTouched = () => {
    // Initial placeholder - overridden by registerOnTouched
  };

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {}

  ngAfterContentInit() {
    this.cdr.detectChanges();
    if (this.options.length === 0 && this.optionsQueryList?.length) {
      this.options = this.optionsQueryList.map((opt) => ({
        value: opt.value,
        label: opt.label,
      }));
    }
  }

  get value(): string | string[] | null {
    return this._value;
  }

  set value(val: string | string[] | null) {
    if (this._value !== val) {
      this._value = val;
      this._onChange(val);
      this.selectionChange.emit(val);
    }
  }

  get displayValue(): string {
    if (!this.value) return this.placeholder;

    if (this.multiple) {
      if (!Array.isArray(this.value) || !this.options) return this.placeholder;
      const selectedOptions = this.options.filter((opt) =>
        (this.value as string[]).includes(opt.value.toString())
      );
      return (
        selectedOptions.map((opt) => opt.label).join(', ') || this.placeholder
      );
    }

    const selectedOption = this.options.find(
      (opt) => opt.value.toString() === this.value
    );
    return selectedOption?.label ?? this.placeholder;
  }

  writeValue(value: string | string[] | null): void {
    this._value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | string[] | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  togglePanel(event?: Event): void {
    event?.stopPropagation();
    if (this.disabled) return;

    this.isOpen = !this.isOpen;
    this.openedChange.emit(this.isOpen);

    if (this.isOpen) {
      setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
      this.focusedOptionIndex = -1;
    } else {
      this.closed.emit();
    }
  }

  selectOption(option: SelectOptionComponent, event?: Event): void {
    event?.stopPropagation();
    if (this.disabled) return;

    if (this.multiple) {
      const current = Array.isArray(this.value) ? [...this.value] : [];
      this._value = current.includes(option.value.toString())
        ? current.filter((v) => v !== option.value.toString())
        : [...current, option.value.toString()];
      this._onChange(this._value);
      this.selectionChange.emit(this._value);
    } else {
      this._value = option.value.toString();
      this._onChange(this._value);
      this.isOpen = false;
      this.closed.emit();
      this.selectionChange.emit(this._value);
    }

    this._onTouched();
    this.cdr.detectChanges();
  }

  isSelected(option: SelectOptionComponent): boolean {
    if (!this.value) return false;

    if (this.multiple) {
      return (
        Array.isArray(this.value) &&
        this.value.includes(option.value.toString())
      );
    }
    return this.value === option.value.toString();
  }

  get filteredOptions(): SelectOptionComponent[] {
    let opts: SelectOptionComponent[] = [];

    if (this.optionsQueryList?.length > 0) {
      // Use content-projected options if available
      opts = this.optionsQueryList.toArray();
    } else if (this.options.length > 0) {
      // Fallback to input options if no content children
      opts = this.options.map((opt) => {
        const comp = new SelectOptionComponent(this.injector.get(ElementRef));
        comp.value = opt.value;
        comp.label = opt.label;
        comp.disabled = false;
        comp.hidden = false;
        comp.selected = this.isSelected(comp);
        return comp;
      });
    }

    if (!this.searchText) return opts;
    return opts.filter((opt) =>
      opt.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Public getters for test access
  get optionCount(): number {
    return this.optionsQueryList.length;
  }

  get firstOption(): SelectOptionComponent | undefined {
    return this.optionsQueryList.first;
  }

  get optionsArray(): SelectOptionComponent[] {
    return this.getOptionsArray();
  }

  private getOptionsArray(): SelectOptionComponent[] {
    return this.optionsQueryList.toArray();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.trigger.nativeElement.contains(event.target)) {
      this.closePanel();
    }
  }

  closePanel(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.openedChange.emit(false);
      this.closed.emit();
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (
      !this.isOpen &&
      ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)
    ) {
      event.preventDefault();
      this.togglePanel();
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextOption();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevOption();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectFocusedOption();
        break;
      case 'Escape':
        event.preventDefault();
        this.closePanel();
        break;
      case 'Tab':
        this.closePanel();
        break;
    }
  }

  private focusNextOption(): void {
    if (this.filteredOptions.length === 0) return;

    this.focusedOptionIndex =
      this.focusedOptionIndex < this.filteredOptions.length - 1
        ? this.focusedOptionIndex + 1
        : 0;
    this.scrollToOption();
  }

  private focusPrevOption(): void {
    if (this.filteredOptions.length === 0) return;

    this.focusedOptionIndex =
      this.focusedOptionIndex > 0
        ? this.focusedOptionIndex - 1
        : this.filteredOptions.length - 1;
    this.scrollToOption();
  }

  private selectFocusedOption(): void {
    if (
      this.focusedOptionIndex >= 0 &&
      this.focusedOptionIndex < this.filteredOptions.length
    ) {
      this.selectOption(this.filteredOptions[this.focusedOptionIndex]);
    }
  }

  private scrollToOption(): void {
    const options =
      this.panel.nativeElement.querySelectorAll('lib-select-option');
    if (options[this.focusedOptionIndex]) {
      options[this.focusedOptionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }
}
