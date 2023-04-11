import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './views/layout/dashboard/dashboard.component';
import { AdminComponent } from './views/pages/admin1/admin/admin.component';
import { LaundryadminComponent } from './views/pages/laundryadmin/laundryadmin/laundryadmin.component';
import { LoginComponent } from './views/pages/login/login.component';
import { PrintadminComponent } from './views/pages/printadmin/printadmin/printadmin.component';
import { SubAdminComponent } from './views/pages/sub-admin/sub-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'subadmin',
    component: SubAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'laundryadmin',
    component: LaundryadminComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'printadmin',
    component:PrintadminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./views/layout/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
