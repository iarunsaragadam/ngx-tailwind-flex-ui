import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class DrawerComponent {
  @Input() position: 'left' | 'right' = 'left';
  @Input()
  set mode(value: 'persistent' | 'temporary' | 'mini') {
    this._mode = value;
    this.cdr.markForCheck(); // Trigger change detection
  }
  get mode(): 'persistent' | 'temporary' | 'mini' {
    return this._mode;
  }
  private _mode: 'persistent' | 'temporary' | 'mini' = 'temporary';

  private _open = false;

  @Input()
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this.openChange.emit(this._open);
      this.cdr.markForCheck(); // Trigger change detection
    }
  }

  @Output() openChange = new EventEmitter<boolean>();

  constructor(private cdr: ChangeDetectorRef) {}

  get isClosable(): boolean {
    return this._mode === 'temporary';
  }

  get backdrop(): boolean {
    return this._mode === 'temporary' && this._open;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape() {
    if (this.isClosable) {
      this.close();
    }
  }

  toggle(): void {
    this.open = !this._open;
  }

  close(): void {
    this.open = false;
  }

  openDrawer(): void {
    this.open = true;
  }

  @HostBinding('class')
  get drawerClasses(): string {
    return [
      'fixed',
      'top-0',
      this.position === 'left' ? 'left-0' : 'right-0',
      this.getTranslationClass(),
      this._mode === 'mini' ? 'w-16' : 'w-64',
      'h-full',
      'bg-white',
      'z-40',
      'transition-transform',
      'duration-300',
      'shadow-lg',
    ].join(' ');
  }

  private getTranslationClass(): string {
    if (this._open) return 'translate-x-0';
    return this.position === 'left' ? '-translate-x-full' : 'translate-x-full';
  }
}