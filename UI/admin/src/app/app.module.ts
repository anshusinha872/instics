import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './views/layout/dashboard/dashboard.component';
import { HeaderComponent } from './views/partial/header/header.component';
import { FooterComponent } from './views/partial/footer/footer.component';
import { SubAdminComponent } from './views/pages/sub-admin/sub-admin.component';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, HeaderComponent, FooterComponent,
    SubAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
