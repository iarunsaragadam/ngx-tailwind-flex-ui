<<<<<<< HEAD
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RatingComponent } from './rating.component';
import { CommonModule } from "@angular/common";
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';
import { CommonModule } from '@angular/common';
>>>>>>> 42e5b615c5d7a0dc50b88ad1287cb8682f0f462c

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [CommonModule, RatingComponent],
=======
      imports: [RatingComponent, CommonModule],
>>>>>>> 42e5b615c5d7a0dc50b88ad1287cb8682f0f462c
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update rating on click', () => {
    component.setRating(3);
    expect(component.value).toBe(3);
  });

<<<<<<< HEAD
  it('should emit valueChange when rating is set', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit');
    component.setRating(4);
    expect(emitSpy).toHaveBeenCalledWith(4);
  });
});
=======
  it('should support half-star ratings', () => {
    component.allowHalf = true;
    component.setRating(3, true);
    expect(component.value).toBe(3.5);
  });

  it('should not update rating when readonly', () => {
    component.readonly = true;
    component.setRating(4);
    expect(component.value).toBe(0);
  });
});
>>>>>>> 42e5b615c5d7a0dc50b88ad1287cb8682f0f462c
