import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { PrintsellerComponent } from './views/pages/printseller/printseller.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/seller',
    pathMatch: 'full',
  },
  {
    path: 'seller',
    component: LoginComponent,
  },
  {
    path: 'printseller',
    component: PrintsellerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
