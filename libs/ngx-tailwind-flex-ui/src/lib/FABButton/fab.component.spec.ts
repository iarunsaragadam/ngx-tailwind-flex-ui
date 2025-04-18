import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FabComponent } from './fab.component';
import { FABItemComponent } from './FAB-item.component'; // Use lowercase 'fab'

describe('FABComponent', () => {
  let component: FabComponent;
  let fixture: ComponentFixture<FabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FabComponent, FABItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the FAB button', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct size for medium FAB', () => {
    // Your test logic
  });

  it('should display the correct color class', () => {
    // Your test logic
  });

  it('should emit an action when clicked', () => {
    // Your test logic
  });
});