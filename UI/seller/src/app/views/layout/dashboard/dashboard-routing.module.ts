import { PdfListModule } from '../../pages/pdfList/pdf-list.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pdfList',
    pathMatch: 'full',
  },
  {
    path: 'pdfList',
    loadChildren: () =>
      import('../../pages/pdfList/pdf-list.module').then(
        (m) => m.PdfListModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
