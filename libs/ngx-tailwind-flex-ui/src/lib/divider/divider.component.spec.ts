import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerComponent } from './divider.component';
import { CommonModule } from '@angular/common';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a horizontal divider by default', () => {
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList.contains('border-t')).toBeTruthy();
    expect(divider.style.width).toBe('100%');
    expect(divider.style.height).toBe('1px');
    expect(divider.classList.contains('border-solid')).toBeTruthy();
    expect(divider.style.borderWidth).toBe('1px');
    expect(divider.style.borderColor).toBe('#d1d5db');
    expect(divider.getAttribute('role')).toBe('presentation');
  });

  it('should render a vertical divider when orientation is vertical', () => {
    component.orientation = 'vertical';
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList.contains('border-l')).toBeTruthy();
    expect(divider.classList.contains('border-t')).toBeFalsy();
    expect(divider.style.height).toBe('100%');
    expect(divider.style.width).toBe('1px');
    expect(divider.style.borderColor).toBe('#d1d5db');
  });

  it('should apply inset margins', () => {
    component.inset = true;
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.style.marginLeft).toBe('1rem');
    expect(divider.style.marginRight).toBe('1rem');

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.style.marginTop).toBe('1rem');
    expect(divider.style.marginBottom).toBe('1rem');
  });

  it('should apply custom thickness', () => {
    component.thickness = 3;
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.style.borderWidth).toBe('3px');

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.style.borderWidth).toBe('3px');
  });

  it('should apply custom border color', () => {
    component.color = '#ff0000';
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.style.borderColor).toMatch(/#ff0000|rgb\(255,\s*0,\s*0\)/);

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.style.borderColor).toMatch(/#ff0000|rgb\(255,\s*0,\s*0\)/);
  });

  it('should apply custom text color', () => {
    component.text = 'OR';
    component.textColor = '#00ff00';
    fixture.detectChanges();
    const textSpan = fixture.nativeElement.querySelector('span');
    expect(textSpan.style.color).toMatch(/#00ff00|rgb\(0,\s*255,\s*0\)/);

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(textSpan.style.color).toMatch(/#00ff00|rgb\(0,\s*255,\s*0\)/);
  });

  it('should apply dashed style', () => {
    component.style = 'dashed';
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList.contains('border-dashed')).toBeTruthy();
    expect(divider.classList.contains('border-solid')).toBeFalsy();

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.classList.contains('border-dashed')).toBeTruthy();
  });

  it('should apply dotted style', () => {
    component.style = 'dotted';
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList.contains('border-dotted')).toBeTruthy();
    expect(divider.classList.contains('border-solid')).toBeFalsy();

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.classList.contains('border-dotted')).toBeTruthy();
  });

  it('should render text with custom styling', () => {
    component.text = 'OR';
    component.textColor = '#ef4444';
    component.textSize = '1.5rem';
    component.textWeight = 'bold';
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    const textSpan = divider.querySelector('span');
    expect(divider.classList.contains('flex')).toBeTruthy();
    expect(divider.classList.contains('items-center')).toBeTruthy();
    expect(divider.getAttribute('role')).toBe('separator');
    expect(divider.getAttribute('aria-label')).toBe('OR');
    expect(textSpan.textContent.trim()).toBe('OR');
    expect(textSpan.style.color).toMatch(/#ef4444|rgb\(239,\s*68,\s*68\)/);
    expect(textSpan.style.fontSize).toBe('1.5rem');
    expect(textSpan.style.fontWeight).toBe('bold');

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.classList.contains('flex-col')).toBeTruthy();
    expect(divider.classList.contains('justify-center')).toBeTruthy();
    expect(textSpan.style.color).toMatch(/#ef4444|rgb\(239,\s*68,\s*68\)/);
  });

  it('should apply custom length', () => {
    component.length = '50px';
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.style.width).toBe('50px');

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.style.height).toBe('50px');
  });

  it('should apply hover effect', () => {
    component.hoverEffect = true;
    fixture.detectChanges();
    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList.contains('transition-all')).toBeTruthy();
    expect(divider.classList.contains('hover:border-gray-500')).toBeTruthy();

    component.orientation = 'vertical';
    fixture.detectChanges();
    expect(divider.classList.contains('transition-all')).toBeTruthy();
    expect(divider.classList.contains('hover:border-gray-500')).toBeTruthy();
  });
});
