import { Component, OnInit } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { appRoutes } from './app.routes'; // Import app routes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'playground';
  navItems: { path: string; label: string }[] = [];

  ngOnInit() {
    // Generate navigation items from routes
    this.navItems = this.extractNavItems(appRoutes);
  }

  // Extract navigation items from the routes configuration
  private extractNavItems(routes: Route[]): { path: string; label: string }[] {
    return routes
      .filter((route) => route.path && route.path !== '' && !route.redirectTo)
      .map((route) => ({
        path: route.path as string,
        label: this.formatLabel(route.path as string),
      }));
  }

  // Format route path as a readable label
  private formatLabel(path: string): string {
    // Convert camelCase or kebab-case to Title Case
    return path
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
