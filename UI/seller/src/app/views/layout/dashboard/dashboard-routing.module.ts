import { PdfListModule } from './../../pages/pdfList/pdf-list/pdf-list.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pdfList',
    pathMatch: 'full',
  },
  {
    path: 'pdfList',
    loadChildren: () => import('../../pages/pdfList/pdf-list/pdf-list.module').then(m => m.PdfListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
