import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() length = 100; // Total items
  @Input() pageSize = 10; // Items per page
  @Input() pageIndex = 0; // Current page
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizeOptions = [10, 20, 50, 100];

  @HostBinding('class') get hostClasses() {
    return 'flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm w-full';
  }

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  get isFirstPage(): boolean {
    return this.pageIndex === 0;
  }

  get isLastPage(): boolean {
    return this.pageIndex === this.totalPages - 1;
  }

  get startItem(): number {
    return this.pageIndex * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.length);
  }

  changePage(newIndex: number) {
    if (newIndex >= 0 && newIndex < this.totalPages) {
      this.pageIndex = newIndex;
      this.pageChange.emit(this.pageIndex);
    }
  }

  changePageSize(event: Event) {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSize = newSize;
    this.pageIndex = 0; // Reset to first page
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit(this.pageIndex);
  }
}
