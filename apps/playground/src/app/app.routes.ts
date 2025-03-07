import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'button', pathMatch: 'full' },
  {
    path: 'button',
    loadComponent: () =>
      import('./components/button-demo/button-demo.component').then(
        (m) => m.ButtonDemoComponent
      ),
  },
];
