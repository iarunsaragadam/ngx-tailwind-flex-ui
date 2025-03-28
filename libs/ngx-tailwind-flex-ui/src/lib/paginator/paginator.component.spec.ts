import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PaginatorComponent], // Import component directly
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the paginator component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default pageSize of 10', () => {
    expect(component.pageSize).toBe(10);
  });

  it('should display correct initial page range', () => {
    const pageInfo = fixture.debugElement.query(By.css('span.text-gray-500')).nativeElement;
    expect(pageInfo.textContent.trim()).toBe('1 – 10 of 100');
  });

  it('should disable previous button on first page', () => {
    const prevButton = fixture.debugElement.queryAll(By.css('button'))[0];
    expect(prevButton.nativeElement.disabled).toBeTruthy();
  });

  it('should enable next button when not on last page', () => {
    const nextButton = fixture.debugElement.queryAll(By.css('button'))[1];
    expect(nextButton.nativeElement.disabled).toBeFalsy();
  });

  it('should change page when clicking next button', () => {
    const nextButton = fixture.debugElement.queryAll(By.css('button'))[1];
    nextButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.pageIndex).toBe(1);
    const pageInfo = fixture.debugElement.query(By.css('span.text-gray-500')).nativeElement;
    expect(pageInfo.textContent.trim()).toBe('11 – 20 of 100');
  });

  it('should change page when clicking previous button', () => {
    component.pageIndex = 1;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.queryAll(By.css('button'))[0];
    prevButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.pageIndex).toBe(0);
    const pageInfo = fixture.debugElement.query(By.css('span.text-gray-500')).nativeElement;
    expect(pageInfo.textContent.trim()).toBe('1 – 10 of 100');
  });

  it('should change page size when selecting new value', () => {
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = '50';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.pageSize).toBe(50);
    expect(component.pageIndex).toBe(0);
    const pageInfo = fixture.debugElement.query(By.css('span.text-gray-500')).nativeElement;
    expect(pageInfo.textContent.trim()).toBe('1 – 50 of 100');
  });

  it('should disable next button on last page', () => {
    component.pageIndex = component.totalPages - 1;
    fixture.detectChanges();

    const nextButton = fixture.debugElement.queryAll(By.css('button'))[1];
    expect(nextButton.nativeElement.disabled).toBeTruthy();
  });

  it('should emit pageChange when changing page', () => {
    jest.spyOn(component.pageChange, 'emit');

    component.changePage(2);
    fixture.detectChanges();

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageSizeChange when changing page size', () => {
    jest.spyOn(component.pageSizeChange, 'emit');

    component.changePageSize({ target: { value: '50' } } as unknown as Event);
    fixture.detectChanges();

    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(50);
  });
});
