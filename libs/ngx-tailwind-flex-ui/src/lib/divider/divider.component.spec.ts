import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply horizontal classes by default', () => {
    const div: HTMLElement = fixture.nativeElement;
    expect(div.classList).toContain('h-px');
    expect(div.getAttribute('role')).toBe('separator');
    expect(div.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should switch to vertical orientation', () => {
    component.orientation = 'vertical';
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement;
    expect(div.classList).toContain('w-px');
    expect(div.getAttribute('aria-orientation')).toBe('vertical');
  });
});
