import {
  Component,
  Input,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-select-option',
  template: `
    <ng-content></ng-content>
    <span *ngIf="label && !isContentProjected()" class="ml-2">{{ label }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer',
    '[class.bg-blue-50]': 'selected',
    '[class.font-medium]': 'selected',
    '[class.text-blue-600]': 'selected',
    '[class.opacity-50]': 'disabled',
    '[class.cursor-not-allowed]': 'disabled',
    role: 'option',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled',
    '[class.hidden]': 'hidden',
  },
  standalone: true,
  imports: [CommonModule],
})
export class SelectOptionComponent {
  @Input() value: string | number = '';
  @Input() label = '';
  @Input() disabled = false;
  @Input() selected = false;
  @HostBinding('class.hidden') hidden = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Made public to be accessible in the template
  public isContentProjected(): boolean {
    return !!this.elementRef.nativeElement.firstChild;
  }
}
