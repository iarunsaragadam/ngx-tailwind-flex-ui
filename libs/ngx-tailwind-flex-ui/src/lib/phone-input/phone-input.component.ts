import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { countryData } from './country-data';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';



type Country = {
  iso2: string;
  dialCode: string;
  flag: string;
};

@Component({
  selector: 'lib-phone-input',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf],
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberInputComponent),
      multi: true,
    },
  ],
})
export class PhoneNumberInputComponent implements OnInit, ControlValueAccessor {
  @Input() country = 'IN';
  @Input() format: 'e164' | 'national' | 'international' = 'e164';
  @Input() showCountryCode = false;
  @Input() showCountryFlag = false;
  @Input() disableCountryDropdown = false;

  countries: Country[] = countryData;
  selectedCountry: Country = {
    iso2: 'IN',
    dialCode: '91',
    flag: '🇮🇳',
  };

  phoneNumber = '';
  phoneUtil = PhoneNumberUtil.getInstance();

  // ✅ Underscore to bypass ESLint "no-empty-function"
  private onChange: (_: string) => void = () => {
    //intentionally empty to avoid "no-empty-function" lint error
  };
  private onTouched: () => void = () => {
    //intentionally empty to avoid "no-empty-function" lint error
  };

  ngOnInit(): void {
    const found = this.countries.find((c) => c.iso2 === this.country);
    if (found) this.selectedCountry = found;
  }

  onCountryChange(iso2: string): void {
    const found = this.countries.find((c) => c.iso2 === iso2);
    if (found) this.selectedCountry = found;
    this.formatPhoneNumber(this.phoneNumber);
  }

  onInputChange(value: string): void {
    this.phoneNumber = value;
    this.formatPhoneNumber(value);
  }

  formatPhoneNumber(raw: string): void {
    try {
      const parsed = this.phoneUtil.parse(raw, this.selectedCountry.iso2);
      if (this.phoneUtil.isValidNumber(parsed)) {
        let formatted = '';
        switch (this.format) {
          case 'e164':
            formatted = this.phoneUtil.format(parsed, PhoneNumberFormat.E164);
            break;
          case 'national':
            formatted = this.phoneUtil.format(parsed, PhoneNumberFormat.NATIONAL);
            break;
          case 'international':
            formatted = this.phoneUtil.format(parsed, PhoneNumberFormat.INTERNATIONAL);
            break;
        }
        this.onChange(formatted);
      } else {
        this.onChange(raw); // fallback if invalid
      }
    } catch {
      this.onChange(raw);
    }
  }

  writeValue(value: string): void {
    this.phoneNumber = value || '';
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
