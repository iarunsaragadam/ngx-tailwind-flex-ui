import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pininput.component.html',
  styles: [],
})
export class PininputComponent implements AfterViewInit, OnChanges {
  @Input() public length = 6;
  @Input() public type = 'number';
  @Input() public mask = false;
  @Input() public autoSubmit = false;
  @Input() public disabled = false;
  @Input() public customClass = '';
  @Input() public pin = '';
  @Input() public preventPaste = false;
  @Output() public completed = new EventEmitter<string>();

  @ViewChildren('otpInput') inputBoxes!: QueryList<ElementRef<HTMLInputElement>>;
  public otpValues: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['length']) {
      this.otpValues = new Array(this.length).fill('');
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputBoxes.get(0)?.nativeElement.focus();
    }, 100);
  }

  public onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (this.type === 'number' && !/^\d$/.test(value)) {
      input.value = '';
      return;
    }

    this.otpValues[index] = value;

    if (value && index < this.length - 1) {
      this.inputBoxes.get(index + 1)?.nativeElement.focus();
    }

    if (this.otpValues.every((v) => v !== '')) {
      this.emitOTP();
    }
  }

  public onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (this.otpValues[index]) {
        this.otpValues[index] = '';
      } else if (index > 0) {
        this.inputBoxes.get(index - 1)?.nativeElement.focus();
      }
    }
  }

  public onPaste(event: ClipboardEvent) {
    if (this.preventPaste) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') ?? '';
    const valid = this.type === 'number' ? /^\d+$/ : /^[a-zA-Z0-9]+$/;

    if (pasteData.length === this.length && valid.test(pasteData)) {
      this.otpValues = pasteData.split('');
      this.otpValues.forEach((char, i) => {
        const box = this.inputBoxes.get(i);
        if (box) {
          box.nativeElement.value = char;
        }
      });
      this.emitOTP();
    }
  }

  public emitOTP() {
    const otp = this.otpValues.join('');
    if (this.autoSubmit) {
      this.completed.emit(otp);
    }
  }
}
