import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Ensure FormsModule is imported
  templateUrl: './pininput.component.html',
  styles: [],
})
export class PininputComponent implements AfterViewInit {
  @Input() public length = 6; // Default 6-digit OTP
  @Input() public type = 'number'; // Accepts only numbers by default
  @Input() public mask = false; // Mask input like passwords
  @Input() public autoSubmit = false; // Auto-submit when complete
  @Input() public disabled = false; // Disable input
  @Input() public customClass = ''; // Custom styling
  @Input() public pin = ''; // Ensure property exists
  @Input() public preventPaste = false;
  @Output() public completed = new EventEmitter<string>(); // Emits OTP when complete

  @ViewChildren('otpInput') inputBoxes!: QueryList<ElementRef>;
  public otpValues: string[] = [];

  constructor() {
    this.otpValues = new Array(this.length).fill('');
  }

  ngAfterViewInit() {
    setTimeout(() => this.inputBoxes.get(0)?.nativeElement.focus(), 100);
  }

  /** Handles user input in OTP fields */
  public onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Allow only numbers if type is 'number'
    if (this.type === 'number' && !/^\d$/.test(value)) {
      input.value = '';
      return;
    }

    this.otpValues[index] = value;

    // Move to the next input box if a digit is entered
    if (value && index < this.length - 1) {
      this.inputBoxes.get(index + 1)?.nativeElement.focus();
    }

    // Emit OTP if all fields are filled
    if (this.otpValues.every((v) => v !== '')) {
      this.emitOTP();
    }
  }

  /** Handles Backspace key for moving to the previous field */
  public onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpValues[index] && index > 0) {
      this.inputBoxes.get(index - 1)?.nativeElement.focus();
    }
  }

  /** Handles pasting OTP values */
  public onPaste(event: ClipboardEvent) {
    if (this.preventPaste) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') ?? '';

    // Validate if the pasted data length matches the OTP length
    if (pasteData.length === this.length && /^[a-zA-Z0-9]+$/.test(pasteData)) {
      this.otpValues = pasteData.split('');
      this.emitOTP();
    }
  }

  /** Emits OTP when all fields are filled */
  public emitOTP() {
    const otp = this.otpValues.join('');
    if (this.autoSubmit) {
      this.completed.emit(otp);
    }
  }
}
