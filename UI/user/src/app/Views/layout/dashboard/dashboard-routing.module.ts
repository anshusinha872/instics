import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/guard/auth.guard';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { CategoryComponent } from '../../pages/category/category.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'services',
    pathMatch: 'full',
  },
  {
    path: 'services',
    loadChildren: () =>
      import('../../pages/services/services.module').then(
        (m) => m.ServicesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'print',
    loadChildren: () =>
      import('../../pages/print/print.module').then((m) => m.PrintModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../../pages/cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('../../pages/payment/payment.module').then((m) => m.PaymentModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
