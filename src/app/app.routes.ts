import { Routes } from '@angular/router';
import { ColorGridComponent } from './components/color-grid/color-grid.component';
import { AboutMeComponent } from './components/about-me/about-me.component';

export const routes: Routes = [
  {
    path: 'color-grid',
    component: ColorGridComponent
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  }
];
