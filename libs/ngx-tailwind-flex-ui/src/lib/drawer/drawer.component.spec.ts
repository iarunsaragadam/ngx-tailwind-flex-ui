import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render drawer content when closed', () => {
    component.open = false;
    fixture.detectChanges();
    const drawer = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(drawer.classList.contains('hidden')).toBe(true);
  });

  it('should render drawer content when open', () => {
    component.open = true;
    fixture.detectChanges();
    const drawer = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(drawer.classList.contains('hidden')).toBe(false);
  });

  it('should show backdrop in temporary mode when open', () => {
    component.mode = 'temporary';
    component.open = true;
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.bg-black.bg-opacity-50');
    expect(backdrop).not.toBeNull();
  });

  it('should not show backdrop in persistent or mini modes', () => {
    component.mode = 'persistent';
    component.open = true;
    fixture.detectChanges();
    let backdrop = fixture.nativeElement.querySelector('.bg-black.bg-opacity-50');
    expect(backdrop).toBeNull();

    component.mode = 'mini';
    component.open = true;
    fixture.detectChanges();
    backdrop = fixture.nativeElement.querySelector('.bg-black.bg-opacity-50');
    expect(backdrop).toBeNull();
  });

  it('should emit openChange and close on backdrop click', () => {
    component.mode = 'temporary';
    component.open = true;
    fixture.detectChanges();

    jest.spyOn(component.openChange, 'emit');
    jest.spyOn(component, 'close');

    const backdrop = fixture.nativeElement.querySelector('.bg-black.bg-opacity-50');
    if (backdrop) {
      backdrop.click();
      fixture.detectChanges();
      expect(component.openChange.emit).toHaveBeenCalledWith(false);
      expect(component.close).toHaveBeenCalled();
    } else {
      expect(backdrop).not.toBeNull(); // Fail explicitly
    }
  });

  it('should close the drawer on Escape key (temporary mode only)', () => {
    component.mode = 'temporary';
    component.open = true;
    fixture.detectChanges();

    jest.spyOn(component, 'close');

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.close).toHaveBeenCalled();
  });

  it('should not close on Escape in persistent or mini modes', () => {
    jest.spyOn(component, 'close');

    component.mode = 'persistent';
    component.open = true;
    fixture.detectChanges();

    let event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.close).not.toHaveBeenCalled();

    component.mode = 'mini';
    component.open = true;
    fixture.detectChanges();

    event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should set proper accessibility attributes on backdrop', () => {
    component.mode = 'temporary';
    component.open = true;
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector('.bg-black.bg-opacity-50');
    if (backdrop) {
      expect(backdrop.getAttribute('aria-hidden')).toBe('true');
    } else {
      expect(backdrop).not.toBeNull(); // Fail explicitly
    }
  });

  it('should close drawer when close button is clicked in temporary mode', () => {
    component.mode = 'temporary';
    component.open = true;
    fixture.detectChanges();

    jest.spyOn(component, 'close');

    const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close Drawer"]');
    closeButton.click();
    fixture.detectChanges();

    expect(component.close).toHaveBeenCalled();
  });

  it('should apply correct width in mini mode', () => {
    component.mode = 'mini';
    component.open = true;
    fixture.detectChanges();

    const drawer = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(drawer.classList.contains('w-16')).toBe(true);
  });
});