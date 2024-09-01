import { Routes } from '@angular/router';
import { ColorGridComponent } from './components/color-grid/color-grid.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PlannerComponent } from './components/planner/planner.component';

export const routes: Routes = [
  {
    path: 'web-dev',
    children: [
      {
        path: 'color-grid',
        component: ColorGridComponent
      },
      {
        path: 'planner',
        component: PlannerComponent
      }
    ]
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  },
  {
    path: '**',
    redirectTo: 'about-me'
  }
];
