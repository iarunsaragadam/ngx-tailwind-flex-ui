import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant class', () => {
    expect(fixture.nativeElement.classList).toContain('bg-white');
  });

  it('should apply outlined variant class', () => {
    component.variant = 'outlined';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('border');
    expect(fixture.nativeElement.classList).toContain('border-gray-200');
  });

  it('should apply elevated variant class', () => {
    component.variant = 'elevated';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('shadow-md');
  });

  it('should apply different padding classes', () => {
    component.padding = 'large';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('p-6');

    component.padding = 'small';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('p-2');
  });

  it('should apply different rounded classes', () => {
    component.rounded = 'large';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('rounded-lg');

    component.rounded = 'none';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('rounded-none');
  });

  it('should apply custom classes', () => {
    component.class = 'custom-class test-class';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('custom-class');
    expect(fixture.nativeElement.classList).toContain('test-class');
  });
});
