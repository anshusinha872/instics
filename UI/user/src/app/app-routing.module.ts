import { ContactComponent } from './Views/pages/contact/contact.component';
import { AboutComponent } from './Views/pages/about/about.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Views/layout/dashboard/dashboard.component';
import { LoginComponent } from './Views/pages/login/login.component';
import { SignupComponent } from './Views/pages/sign-up/sign-up.component';
import { AuthGuard } from './services/guard/auth.guard';
import { HomePageComponent } from './Views/pages/home/home.component';
import { PrivacyComponent } from './Views/pages/privacy/privacy.component';
import { TocComponent } from './Views/pages/toc/toc.component';
import { CookiesPolicyComponent } from './Views/pages/cookies-policy/cookies-policy.component';
import { RefundComponent } from './Views/pages/refund/refund.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
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
    path: 'about',
    component:AboutComponent
  },
  {
    path: 'contact',
    component:ContactComponent
  },
  {
    path: 'privacy',
    component:PrivacyComponent
  },
  {
    path: 'terms',
    component:TocComponent
  },
  {
    path: 'cookies',
    component:CookiesPolicyComponent
  },
  {
    path: 'refund',
    component:RefundComponent
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./Views/layout/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
