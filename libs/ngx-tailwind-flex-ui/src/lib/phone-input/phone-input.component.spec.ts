import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhoneNumberInputComponent } from './phone-input.component';
import { PhoneNumberUtil } from 'google-libphonenumber';

describe('PhoneNumberInputComponent', () => {
  let component: PhoneNumberInputComponent;
  let fixture: ComponentFixture<PhoneNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        PhoneNumberInputComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update phone number and call onChange with formatted E.164', () => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const parsed = phoneUtil.parseAndKeepRawInput('+919876543210', 'IN');

    jest.spyOn(phoneUtil, 'parse').mockReturnValue(parsed);
    jest.spyOn(phoneUtil, 'isValidNumber').mockReturnValue(true);
    jest.spyOn(phoneUtil, 'format').mockReturnValue('+919876543210');

    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    component.onInputChange('+919876543210');
    expect(onChangeSpy).toHaveBeenCalledWith('+919876543210');
  });

  it('should fallback to raw input for invalid numbers', () => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    jest.spyOn(phoneUtil, 'parse').mockImplementation(() => {
      throw new Error('Invalid number');
    });

    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    const rawInput = 'invalid-phone';
    component.onInputChange(rawInput);
    expect(onChangeSpy).toHaveBeenCalledWith(rawInput);
  });
});
