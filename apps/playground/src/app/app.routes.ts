import { Route } from './app.component'; // Import the Route interface if necessary

export const appRoutes: Route[] = [
  {
    path: 'home',
    label: 'Home',
    redirectTo: '/home',
  },
  {
    path: 'about',
    label: 'About',
  },
  // More route configurations...
];
