import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('slideInOut', [
      transition(
        ':enter',
        [
          style({ transform: '{{startTransform}}' }),
          animate('300ms ease-in', style({ transform: '{{endTransform}}' })),
        ],
        {
          params: {
            startTransform: 'translateY(-100%)',
            endTransform: 'translateY(0%)',
          },
        }
      ),
      transition(
        ':leave',
        [animate('300ms ease-out', style({ transform: '{{startTransform}}' }))],
        {
          params: {
            startTransform: 'translateY(-100%)',
            endTransform: 'translateY(0%)',
          },
        }
      ),
    ]),
  ],
})
export class AlertComponent implements AfterViewInit, OnDestroy {
  private static activeAlerts: AlertComponent[] = [];
  private _type: 'success' | 'error' | 'warning' | 'info' = 'info';
  private _position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right' = 'top-right';
  private _iconColor: string | null = null;
  private _customClass: string | null = null;

  @Input() message = '';
  @Input()
  set type(value: 'success' | 'error' | 'warning' | 'info') {
    if (!['success', 'error', 'warning', 'info'].includes(value)) {
      throw new Error(
        `Invalid type: ${value}. Must be one of 'success', 'error', 'warning', 'info'.`
      );
    }
    this._type = value;
    this.cdr.markForCheck();
  }
  get type(): 'success' | 'error' | 'warning' | 'info' {
    return this._type;
  }

  @Input() duration = 5000;
  @Input() action: string | null = null;
  @Input() dismissible = false;
  @Input()
  set position(
    value:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right'
  ) {
    if (
      ![
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ].includes(value)
    ) {
      throw new Error(
        `Invalid position: ${value}. Must be one of 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'.`
      );
    }
    this._position = value;
    this.cdr.markForCheck();
  }
  get position():
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right' {
    return this._position;
  }

  @Input() icon: string | null = null;
  @Input()
  set iconColor(value: string | null) {
    this._iconColor = value;
    this.cdr.detectChanges(); // Force change detection
  }
  get iconColor(): string | null {
    return this._iconColor;
  }

  @Input()
  set customClass(value: string | null) {
    this._customClass = value;
    this.cdr.detectChanges(); // Force change detection
  }
  get customClass(): string | null {
    return this._customClass;
  }

  @Input() animation: 'fade' | 'slide' = 'fade';
  @Input() actionTemplate: TemplateRef<unknown> | null = null;
  @Input() bypassDuplicateCheck = false;

  @Output() actionClicked = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isVisible = true;
  offset = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (!this.bypassDuplicateCheck) {
      const duplicate = AlertComponent.activeAlerts.find(
        (alert) =>
          alert.message === this.message && alert.position === this.position
      );
      if (duplicate) {
        this.isVisible = false;
        this.cdr.markForCheck();
        return;
      }
    }

    AlertComponent.activeAlerts.push(this);
    this.updatePositions();
    if (this.duration > 0) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    const index = AlertComponent.activeAlerts.indexOf(this);
    if (index !== -1) {
      AlertComponent.activeAlerts.splice(index, 1);
      this.updatePositions();
    }
    this.clearTimer();
  }

  getClasses(): string[] {
    const classes: string[] = [];

    switch (this.type) {
      case 'success':
        classes.push(
          'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-green-200'
        );
        break;
      case 'error':
        classes.push(
          'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-600 dark:text-red-200'
        );
        break;
      case 'warning':
        classes.push(
          'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200'
        );
        break;
      case 'info':
        classes.push(
          'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
        );
        break;
    }

    if (this.position === 'top-left' || this.position === 'bottom-left') {
      classes.push('left-4');
    } else if (
      this.position === 'top-center' ||
      this.position === 'bottom-center'
    ) {
      classes.push('left-1/2', '-translate-x-1/2');
    } else if (
      this.position === 'top-right' ||
      this.position === 'bottom-right'
    ) {
      classes.push('right-4');
    }

    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes;
  }

  getIcon(): string {
    if (this.icon) {
      return this.icon;
    }
    switch (this.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }

  getAnimationParams() {
    const isTop = this.position.includes('top');
    const isLeft = this.position.includes('left');
    const isRight = this.position.includes('right');
    return {
      startTransform: isTop
        ? 'translateY(-100%)'
        : isLeft
        ? 'translateX(-100%)'
        : isRight
        ? 'translateX(100%)'
        : 'translateY(100%)',
      endTransform: 'translateY(0%) translateX(0%)',
    };
  }

  get ariaLabel(): string {
    return `${this.type} alert: ${this.message}${
      this.action ? ', with action: ' + this.action : ''
    }`;
  }

  onAction(): void {
    this.actionClicked.emit();
  }

  close(): void {
    this.isVisible = false;
    this.closed.emit();
    this.cdr.markForCheck();
  }

  pauseTimer(): void {
    this.clearTimer();
  }

  resumeTimer(): void {
    if (this.duration > 0) {
      this.startTimer();
    }
  }

  private startTimer(): void {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.close();
    }, this.duration);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private updatePositions(): void {
    const alertsAtPosition = AlertComponent.activeAlerts.filter(
      (alert) => alert.position === this.position && alert.isVisible
    );
    let offset = 0;
    for (const alert of alertsAtPosition) {
      alert.offset = offset;
      offset += 60; // Adjust based on alert height + margin
      alert.cdr.markForCheck();
    }
  }
}
