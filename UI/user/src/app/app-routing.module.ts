import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './view/pages/login/login.component';
import { SignupComponent } from './view/pages/signup/signup.component';
const routes: Routes = [
  { path: '', redirectTo: 'LoginComponent', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  {path:'dashboard',component:DashboardComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  // {
  //   path: 'login', children: [
  //     { path: 'signup', component: SignupComponent },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
