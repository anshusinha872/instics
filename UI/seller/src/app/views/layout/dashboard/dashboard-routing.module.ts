import { PdfListModule } from '../../pages/pdfList/pdf-list.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth/auth.guard';
import { LaundryGuard } from 'src/app/guard/laundry/laundry.guard';
import { PrintingGuard } from 'src/app/guard/printing/printing.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'pdfList',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'pdfList',
  //   loadChildren: () =>
  //     import('../../pages/pdfList/pdf-list.module').then(
  //       (m) => m.PdfListModule
  //     ),
  //   canActivate: [AuthGuard],
  // },
  {
    path:'printing',
    loadChildren: () =>import('../../pages/pdfList/pdf-list.module').then(m => m.PdfListModule),
    canActivate: [PrintingGuard],
  },
  // {
  //   path:'printing/:id',
  //   loadChildren: () =>import('../../pages/pdfList/pdf-list.module').then(m => m.PdfListModule),
  //   // canActivate: [AuthGuard],
  // },
  {
    path:'laundry',
    loadChildren: () =>import('../../pages/laundry/laundry.module').then(m => m.LaundryModule),
    canActivate: [LaundryGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
