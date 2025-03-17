import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PininputComponent } from './pininput.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('PinInputComponent', () => {
  let component: PininputComponent;
  let fixture: ComponentFixture<PininputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
    })
      .overrideComponent(PininputComponent, {
        set: {
          template: '<div>Mock Pin Input</div>', // ✅ Jest-friendly inline template
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PininputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit OTP when all fields are filled', () => {
    component.autoSubmit = true; // ✅ Ensure property is available
    const emitSpy = jest.spyOn(component.completed, 'emit');
    component.otpValues = ['1', '2', '3', '4', '5', '6'];
    component.emitOTP();
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith('123456');
  });
});
