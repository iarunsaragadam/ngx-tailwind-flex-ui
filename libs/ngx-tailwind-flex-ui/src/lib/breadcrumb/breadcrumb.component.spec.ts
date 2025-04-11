import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should display correct breadcrumb links and separators', () => {
    component.routes = [
      { label: 'Home', url: '/' },
      { label: 'About' }, // Last breadcrumb, no URL
    ];
    component.separator = '›';
    fixture.detectChanges();

    const anchors = fixture.nativeElement.querySelectorAll('a');
    const spans = fixture.nativeElement.querySelectorAll('span');

    expect(anchors.length).toBe(1);
    expect(anchors[0].textContent.trim()).toBe('Home');
    expect(anchors[0].getAttribute('aria-label')).toBe('Home');

    const aboutSpan = (Array.from(spans) as HTMLElement[]).find((el) =>
      el.textContent?.includes('About')
    );
    expect((aboutSpan as HTMLElement)?.getAttribute('aria-current')).toBe('page');
  });
});
