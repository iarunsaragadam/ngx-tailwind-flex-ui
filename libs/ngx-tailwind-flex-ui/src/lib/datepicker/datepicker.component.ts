import {
  Component, Input, Output, EventEmitter,
  ViewChild, ElementRef, forwardRef, HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'lib-datepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true,
  }]
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() range = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() disabledDates: Date[] = [];
  @Input() holidays: Date[] = [];
  @Input() dateFormat = 'mediumDate';
  @Input() locale = 'en-US';

  @Output() dateChange = new EventEmitter<Date>();
  @Output() rangeChange = new EventEmitter<{ from: Date, to: Date }>();

  @ViewChild('inputRef') inputRef!: ElementRef;

  showCalendar = false;
  currentMonth = new Date();
  selectedDate: Date | null = null;
  rangeStart: Date | null = null;
  rangeEnd: Date | null = null;
  selectingRange = false;

  onChange: (_: unknown) => void = () => {
    //noop: required for controlvalueAccessor
  };
  onTouched: () => void = () => {
    //noop: required for controlvalueAccessor
  };

  get daysInMonth(): (Date | null)[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1));
    return [...blanks, ...days];
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
  }

  isSameDate(a: Date | null, b: Date): boolean {
    return !!a && a.toDateString() === b.toDateString();
  }

  isDisabled(date: Date): boolean {
    if ((this.minDate && date.getTime() < this.minDate.getTime()) ||
     (this.maxDate && date.getTime() > this.maxDate.getTime())) {
      return true;
    }
    return this.disabledDates.some(d => this.isSameDate(d, date));
  }

  isHoliday(date: Date): boolean {
    return this.holidays.some(d => this.isSameDate(d, date));
  }

  selectDate(day: Date | null) {
    if (!day || this.isDisabled(day)) return;

    if (this.range) {
      if (!this.selectingRange || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = day;
        this.rangeEnd = null;
        this.selectingRange = true;
      } else {
        if (this.rangeStart && day < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = day;
        } else {
          this.rangeEnd = day;
        }
        this.selectingRange = false;

        this.onChange({ from: this.rangeStart, to: this.rangeEnd });
        if (this.rangeStart && this.rangeEnd) {
          this.rangeChange.emit({ from: this.rangeStart, to: this.rangeEnd });
          this.showCalendar = false;
        }
      }
    } else {
      this.selectedDate = day;
      this.onChange(this.selectedDate);
      this.dateChange.emit(day);
      this.showCalendar = false;
    }
  }

  formatDate(): string {
    if (this.range) {
      return this.rangeStart && this.rangeEnd
        ? `${formatDate(this.rangeStart, this.dateFormat, this.locale)} - ${formatDate(this.rangeEnd, this.dateFormat, this.locale)}`
        : '';
    }
    return this.selectedDate ? formatDate(this.selectedDate, this.dateFormat, this.locale) : '';
  }

  writeValue(value: unknown): void {
    if (this.range && value && typeof value === 'object' && 'from' in value && 'to' in value) {
      const val = value as { from: string | Date; to: string | Date };
      this.rangeStart = new Date(val.from);
      this.rangeEnd = new Date(val.to);
    } else if (!this.range && value && (typeof value === 'string' || value instanceof Date)) {
      this.selectedDate = new Date(value);
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (!this.inputRef?.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
  }
}
