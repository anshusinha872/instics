import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CodeComponent } from './Views/pages/code/code.component';
import { LoginComponent } from './Views/pages/login/login.component';
import { SignupComponent } from './Views/pages/sign-up/sign-up.component';
import { HomeComponent } from './Views/pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'LoginComponent', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'code',component:CodeComponent},
  {path:'home', component:HomeComponent},
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
