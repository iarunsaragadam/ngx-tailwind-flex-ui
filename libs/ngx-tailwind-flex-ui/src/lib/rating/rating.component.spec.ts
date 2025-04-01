import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';
import { CommonModule } from '@angular/common';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingComponent, CommonModule],
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
