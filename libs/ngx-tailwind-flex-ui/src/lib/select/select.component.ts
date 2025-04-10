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
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectOptionComponent } from './select-option.component';

interface OptionGroup {
  label: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
  disabled?: boolean;
}

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() options: (
    | { value: string | number; label: string; disabled?: boolean }
    | OptionGroup
  )[] = [];
  @Input() searchThreshold: number | null = 10; // Show search only when options >= 10
  @Input() loading = false;
  @Input() isOpen = false;

  @Output() openedChange = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<string | string[] | null>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('panel') panel!: ElementRef;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  @ContentChildren(SelectOptionComponent)
  private optionsQueryList!: QueryList<SelectOptionComponent>;

  searchText = '';
  focusedOptionIndex = -1;
  private _value: string | string[] | null = null;
  private _onChange!: (value: string | string[] | null) => void;
  private _onTouched!: () => void;

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {}

  ngAfterContentInit() {
    if (this.options.length === 0 && this.optionsQueryList?.length) {
      this.options = this.optionsQueryList.map((opt) => ({
        value: opt.value,
        label: opt.label,
        disabled: opt.disabled,
      }));
    }
    this.cdr.detectChanges();
  }

  get value(): string | string[] | null {
    return this._value;
  }

  set value(val: string | string[] | null) {
    if (this._value !== val) {
      this._value = val;
      if (this._onChange) {
        this._onChange(val);
      }
      this.selectionChange.emit(val);
    }
  }

  get displayValue(): string {
    if (!this.value) return this.placeholder;

    if (this.multiple) {
      if (!Array.isArray(this.value)) return this.placeholder;
      const selectedOptions = this.flatOptions.filter((opt) =>
        (this.value as string[]).includes(opt.value.toString())
      );
      return (
        selectedOptions.map((opt) => opt.label).join(', ') || this.placeholder
      );
    }

    const selectedOption = this.flatOptions.find(
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
    this.cdr.detectChanges();
  }

  selectOption(option: SelectOptionComponent, event?: Event): void {
    event?.stopPropagation();
    if (this.disabled || option.disabled) return;

    if (this.multiple) {
      const current = Array.isArray(this._value) ? [...this._value] : [];
      const optionValue = option.value.toString();

      const newValue = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];

      this._value = newValue;
    } else {
      this._value = option.value.toString();
      this.isOpen = false;
      this.closed.emit();
    }

    if (this._onChange) {
      this._onChange(this._value);
    }
    this.selectionChange.emit(this._value);
    if (this._onTouched) {
      this._onTouched();
    }
    this.cdr.detectChanges();
  }

  clearSelection(event: Event): void {
    event.stopPropagation();
    this._value = this.multiple ? [] : null;
    if (this._onChange) {
      this._onChange(this._value);
    }
    this.selectionChange.emit(this._value);
    if (this._onTouched) {
      this._onTouched();
    }
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

  get flatOptions(): {
    value: string | number;
    label: string;
    disabled?: boolean;
  }[] {
    return this.options.reduce((acc, item) => {
      if ('options' in item) {
        return [
          ...acc,
          ...item.options.map((opt) => ({
            ...opt,
            disabled: opt.disabled || item.disabled,
          })),
        ];
      }
      return [...acc, item];
    }, [] as { value: string | number; label: string; disabled?: boolean }[]);
  }

  get filteredOptions(): {
    group?: string;
    options: SelectOptionComponent[];
  }[] {
    let opts: SelectOptionComponent[] = [];

    if (this.optionsQueryList?.length > 0) {
      opts = this.optionsQueryList.toArray();
    } else if (this.options.length > 0) {
      opts = this.flatOptions.map((opt) => {
        const comp = new SelectOptionComponent(this.injector.get(ElementRef));
        comp.value = opt.value;
        comp.label = opt.label;
        comp.disabled = opt.disabled || false;
        comp.hidden = false;
        comp.selected = this.isSelected(comp);
        return comp;
      });
    }

    if (!this.searchText) {
      return this.groupOptions(opts);
    }

    const filtered = opts.filter((opt) =>
      opt.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
    return this.groupOptions(filtered);
  }

  private groupOptions(
    opts: SelectOptionComponent[]
  ): { group?: string; options: SelectOptionComponent[] }[] {
    if (
      this.optionsQueryList?.length > 0 ||
      !this.options.some((opt) => 'options' in opt)
    ) {
      return [{ options: opts }];
    }

    const grouped: { [key: string]: SelectOptionComponent[] } = {};
    const ungrouped: SelectOptionComponent[] = [];

    opts.forEach((opt) => {
      const parentGroup = this.options.find(
        (group) =>
          'options' in group && group.options.some((o) => o.value === opt.value)
      ) as OptionGroup | undefined;

      if (parentGroup) {
        const key = parentGroup.label;
        grouped[key] = grouped[key] || [];
        grouped[key].push(opt);
      } else {
        ungrouped.push(opt);
      }
    });

    const result: { group?: string; options: SelectOptionComponent[] }[] =
      Object.entries(grouped).map(([group, options]) => ({
        group,
        options,
      }));

    if (ungrouped.length > 0) {
      result.push({ options: ungrouped });
    }

    return result;
  }

  get optionCount(): number {
    return this.optionsQueryList.length || this.flatOptions.length;
  }

  get firstOption(): SelectOptionComponent | undefined {
    return this.optionsQueryList.first || this.filteredOptions[0]?.options[0];
  }

  get optionsArray(): SelectOptionComponent[] {
    return this.flatOptions.map((opt) => {
      const comp = new SelectOptionComponent(this.injector.get(ElementRef));
      comp.value = opt.value;
      comp.label = opt.label;
      comp.disabled = opt.disabled || false;
      return comp;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.trigger.nativeElement.contains(event.target) && this.isOpen) {
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
    const flatFiltered = this.filteredOptions.flatMap((group) => group.options);
    if (flatFiltered.length === 0) return;

    this.focusedOptionIndex =
      this.focusedOptionIndex < flatFiltered.length - 1
        ? this.focusedOptionIndex + 1
        : 0;
    this.scrollToOption();
  }

  private focusPrevOption(): void {
    const flatFiltered = this.filteredOptions.flatMap((group) => group.options);
    if (flatFiltered.length === 0) return;

    this.focusedOptionIndex =
      this.focusedOptionIndex > 0
        ? this.focusedOptionIndex - 1
        : flatFiltered.length - 1;
    this.scrollToOption();
  }

  private selectFocusedOption(): void {
    const flatFiltered = this.filteredOptions.flatMap((group) => group.options);
    if (
      this.focusedOptionIndex >= 0 &&
      this.focusedOptionIndex < flatFiltered.length
    ) {
      this.selectOption(flatFiltered[this.focusedOptionIndex]);
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

  showSearch(): boolean {
    return (
      this.searchThreshold === null || this.optionCount >= this.searchThreshold
    );
  }
}
