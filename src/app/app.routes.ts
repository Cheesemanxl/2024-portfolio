import { Routes } from '@angular/router';
import { ColorGridComponent } from './components/color-grid/color-grid.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PlannerComponent } from './components/planner/planner.component';

export const routes: Routes = [
  {
    path: 'color-grid',
    component: ColorGridComponent
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  },
  {
    path: 'planner',
    component: PlannerComponent
  },
  {
    path: '**',
    redirectTo: 'about-me'
  }
];
