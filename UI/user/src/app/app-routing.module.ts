import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Views/layout/dashboard/dashboard.component';
import { LoginComponent } from './Views/pages/login/login.component';
import { SignupComponent } from './Views/pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Views/layout/dashboard/dashboard.module').then(m => m.DashboardModule),
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
