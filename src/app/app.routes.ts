import { Routes } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';
import { HomeComponent } from './features/home/home.component';
import { firstVisitGuard } from './core/guards/first-visit.guard';
import { WelcomeScreenComponent } from './features/welcome-screen/welcome-screen.component';
import { AccessComponent } from './features/access/access.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [firstVisitGuard],
    component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  { path: 'welcome', component: WelcomeScreenComponent },
  { path: 'access', component: AccessComponent },
];
