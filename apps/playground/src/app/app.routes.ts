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
  {
    path: 'icon',
    loadComponent: () =>
      import('./components/icon-demo/icon-demo.component').then(
        (m) => m.IconDemoComponent
      ),
  },
  {
    path: 'card',
    loadComponent: () =>
      import('./components/card-demo/card-demo.component').then(
        (m) => m.CardDemoComponent
      ),
  },
];
