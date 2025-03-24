import { Component, Input, Output, EventEmitter, HostListener, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

@Component({
  selector: 'lib-pagination',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})

export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() currentPage = 0;
  @Input() customTemplate?: TemplateRef<unknown>;

  @Output() pageChange = new EventEmitter<PageEvent>();

  get totalPages():number {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }
  changePage(pageIndex: number) {
    if (pageIndex < 0 || pageIndex >= this.totalPages) return;
    this.currentPage = pageIndex;
    this.emitPageChange();
  }
  changePageSize(size: number) {
    this.pageSize = +size;
    this.currentPage = 0;
    this.emitPageChange();
  }
  emitPageChange() {
    this.pageChange.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      length: this.totalItems,
    });
  }
  //keyboard accessibility support
  @HostListener('keydown.arrowright', ['$event'])
  onRightArrow() {
    this.changePage(this.currentPage + 1);
  }
  
  @HostListener('keydown.arrowleft', ['$event'])
  onLeftArrow() {
    this.changePage(this.currentPage - 1);
  }
  
  @HostListener('keydown.home', ['$event'])
  onHome() {
    this.changePage(0);
  }
  
  @HostListener('keydown.end', ['$event'])
  onEnd() {
    this.changePage(this.totalPages - 1);
  }
}  