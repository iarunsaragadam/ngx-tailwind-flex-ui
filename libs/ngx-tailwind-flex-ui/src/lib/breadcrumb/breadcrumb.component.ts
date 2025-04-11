import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

export interface BreadcrumbRoute {
  label: string;
  url?: string;
  ariaLabel?: string;
}

@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  imports: [CommonModule, RouterModule, RouterLink],
})
export class BreadcrumbComponent {
  @Input() routes: BreadcrumbRoute[] = [];
  @Input() separator = '›';

  get lastIndex(): number {
    return this.routes.length - 1;
  }
}
