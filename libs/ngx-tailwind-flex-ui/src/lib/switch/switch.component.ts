import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'lib-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor {
  // ✅ Public Inputs
  @Input() disabled = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() label = '';
  @Output() toggled = new EventEmitter<boolean>();


  // ✅ Internal state
  private internalChecked = false;

  @Input()
  get checked(): boolean {
    return this.internalChecked;
  }

  set checked(val: boolean) {
    this.internalChecked = val;
    this.onModelChange(val);
    this.toggled.emit(val);
  }

  // ✅ ControlValueAccessor methods
  onModelChange: any = () => {
    //no-op function; will be set by registerOnChange
  };
  onModelTouched: any  = () => {
    //no-op function; will be set by registerOnTouched
  };

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onModelTouched();
  }

  writeValue(value: boolean): void {
    this.internalChecked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
