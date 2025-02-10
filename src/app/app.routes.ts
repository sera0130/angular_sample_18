import { Routes } from '@angular/router';
import { LayoutComponent } from './views/layout/layout/layout.component';
import { Page1Component } from './views/pages/page1/page1.component';
import { page2Component } from './views/pages/page2/page2.component';
import { page3Component } from './views/pages/page3/page3.component';
import { AuthGuard } from './common/guard/auth.guard';
import { Page4Component } from './views/pages/page4/page4.component';

export const routes: Routes = [
  {
    path: 'page',
    component: LayoutComponent,
    children: [
      { path: 'page1', component: Page1Component },
      { path: 'page2', component: page2Component },
      { path: 'page3', component: page3Component, canActivate: [AuthGuard] },
      { path: 'page4', component: Page4Component },
    ],
  },
  {
    path: 'rate',
    component: LayoutComponent,
    children: [
      { path: 'page1', component: Page1Component },
    ],
  },
];