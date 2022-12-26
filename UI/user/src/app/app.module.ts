import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import { HeaderComponent } from './view/partial/header/header.component';
import { FooterComponent } from './view/partial/footer/footer.component';
import { LoginComponent } from './view/pages/login/login.component';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import { FormsModule } from '@angular/forms' 
import { ErrorComponent } from './view/pages/error/error.component';
import { SignupComponent } from './view/pages/signup/signup.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { HomeComponent } from './view/pages/home/home.component';
import { SideBannerComponent } from './view/partial/side-banner/side-banner.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    SignupComponent,
    HomeComponent,
    SideBannerComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    SliderModule,
    PasswordModule,
    DividerModule,
    FormsModule,
    PasswordModule,
    ConfirmDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    NgOtpInputModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
