import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subAdmin',
    pathMatch: 'full',
  },
  {
    path: 'subAdmin',
    loadChildren: () => import('../../pages/sub-admin/sub-admin.module').then(m => m.SubAdminModule),
  },
  // {
  //   path: 'subAdmin',
  //   loadChildren: () => import('../../pages/sub-admin/sub-admin.module').then(m => m.SubAdminModule),
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
