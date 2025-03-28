import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerComponent } from './Datepicker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatepickerComponent,
        CommonModule,
        FormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle calendar visibility', () => {
    expect(component.showCalendar).toBe(false);
    component.toggleCalendar();
    expect(component.showCalendar).toBe(true);
    component.toggleCalendar();
    expect(component.showCalendar).toBe(false);
  });

  it('should select a single date', () => {
    const testDate = new Date(2024, 2, 15);
    component.range = false;
    component.selectDate(testDate);
    expect(component.selectedDate?.toDateString()).toEqual(testDate.toDateString());
  });

  it('should emit single date change', () => {
    let emittedDate: Date | undefined;
    component.dateChange.subscribe((date) => emittedDate = date);
    const testDate = new Date(2024, 2, 15);
    component.range = false;
    component.selectDate(testDate);
    expect(emittedDate).toEqual(testDate);
  });

  it('should select date range', () => {
    const start = new Date('2024-03-01');
    const end = new Date('2024-03-10');
    component.range = true;

    component.selectDate(start);
    expect(component.rangeStart?.toDateString()).toEqual(start.toDateString());
    expect(component.rangeEnd).toBeNull();

    component.selectDate(end);
    expect(component.rangeEnd?.toDateString()).toEqual(end.toDateString());
  });

  it('should emit range change', () => {
    let emittedRange: { from: Date; to: Date } | undefined;
    component.rangeChange.subscribe((range) => emittedRange = range);
    const start = new Date('2024-03-01');
    const end = new Date('2024-03-10');
    component.range = true;

    component.selectDate(start);
    component.selectDate(end);
    expect(emittedRange).toEqual({ from: start, to: end });
  });

  it('should format range correctly', () => {
    component.range = true;
    component.rangeStart = new Date('2024-03-01');
    component.rangeEnd = new Date('2024-03-10');
    const formatted = component.formatDate();
    expect(formatted).toContain('Mar');
    expect(formatted).toContain('2024');
    expect(formatted).toContain('-');
  });

  it('should check if date is disabled', () => {
    const disabledDate = new Date('2024-03-15');
    component.disabledDates = [disabledDate];
    expect(component.isDisabled(disabledDate)).toBe(true);
    expect(component.isDisabled(new Date('2024-03-16'))).toBe(false);
  });

  it('should check if date is a holiday', () => {
    const holiday = new Date('2024-03-25');
    component.holidays = [holiday];
    expect(component.isHoliday(holiday)).toBe(true);
    expect(component.isHoliday(new Date('2024-03-26'))).toBe(false);
  });
});