import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string | number | boolean | null;
}

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() required = false;

  @Output() selectionChange = new EventEmitter<
    string | number | boolean | null | (string | number | boolean | null)[]
  >();
  @Output() openedChange = new EventEmitter<boolean>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown') dropdown!: ElementRef;

  isOpen = false;
  searchText = '';
  filteredOptions: SelectOption[] = [];
  value:
    | string
    | number
    | boolean
    | null
    | (string | number | boolean | null)[] = null;
  touched = false;
  focusedOptionIndex = -1;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  get displayValue(): string {
    if (this.value === null || this.value === undefined) {
      return this.placeholder;
    }

    if (this.multiple) {
      if (Array.isArray(this.value) && this.value !== null) {
        const selectedLabels = this.options
          .filter((opt) =>
            (this.value as (string | number | boolean | null)[]).includes(
              opt.value
            )
          )
          .map((opt) => opt.label);
        return selectedLabels.length > 0
          ? selectedLabels.join(', ')
          : this.placeholder;
      }
      return this.placeholder;
    }

    const selectedOption = this.options.find((opt) => opt.value === this.value);
    return selectedOption ? selectedOption.label : this.placeholder;
  }

  // ControlValueAccessor methods
  onChange: (
    val: string | number | boolean | null | (string | number | boolean | null)[]
  ) => void = () => {
    // This empty implementation will be replaced by registerOnChange
    // We intentionally don't use the val parameter here
  };

  onTouched: () => void = () => {
    // This empty implementation will be replaced by registerOnTouched
  };

  writeValue(
    val: string | number | boolean | null | (string | number | boolean | null)[]
  ): void {
    this.value = val;
    this.onChange(this.value);
    this.cdr.detectChanges();
  }

  registerOnChange(
    fn: (
      val:
        | string
        | number
        | boolean
        | null
        | (string | number | boolean | null)[]
    ) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.openedChange.emit(this.isOpen);
    if (this.isOpen) {
      setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
      this.focusedOptionIndex = -1;
    }
  }

  selectOption(option: SelectOption): void {
    if (this.disabled) return;
    if (this.multiple) {
      const current = Array.isArray(this.value) ? this.value : [];
      this.value = current.includes(option.value)
        ? current.filter((v) => v !== option.value)
        : [...current, option.value];
    } else {
      this.value = option.value;
      this.isOpen = false;
      this.openedChange.emit(false);
    }
    this.markTouched();
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }

  isSelected(option: SelectOption): boolean {
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.includes(option.value);
    }
    return this.value === option.value;
  }

  filterOptions(): void {
    this.filteredOptions = this.options.filter((opt) =>
      opt.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.focusedOptionIndex = -1;
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this.value = this.multiple ? [] : null;
    this.searchText = '';
    this.filteredOptions = [...this.options];
    this.onChange(this.value);
    this.selectionChange.emit(this.value);
    this.markTouched();
  }

  markTouched(): void {
    this.touched = true;
    this.onTouched();
  }

  isInvalid(): boolean {
    return (
      this.required &&
      (this.value === null ||
        (Array.isArray(this.value) && this.value.length === 0)) &&
      this.touched
    );
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isOpen && !target.closest('lib-select')) {
      this.isOpen = false;
      this.openedChange.emit(this.isOpen);
    }
  }

  private scrollToFocusedOption(): void {
    if (this.focusedOptionIndex >= 0 && this.dropdown?.nativeElement) {
      const options = this.dropdown.nativeElement.querySelectorAll('li');
      if (options[this.focusedOptionIndex]) {
        options[this.focusedOptionIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.focusedOptionIndex < this.filteredOptions.length - 1) {
          this.focusedOptionIndex++;
        } else {
          this.focusedOptionIndex = 0; // Wrap around to start
        }
        this.scrollToFocusedOption();
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.focusedOptionIndex > 0) {
          this.focusedOptionIndex--;
        } else {
          this.focusedOptionIndex = this.filteredOptions.length - 1; // Wrap around to end
        }
        this.scrollToFocusedOption();
        break;

      case 'Enter':
        event.preventDefault();
        if (
          this.focusedOptionIndex >= 0 &&
          this.focusedOptionIndex < this.filteredOptions.length
        ) {
          this.selectOption(this.filteredOptions[this.focusedOptionIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.isOpen = false;
        this.openedChange.emit(false);
        break;

      default:
        break;
    }
  }
}
