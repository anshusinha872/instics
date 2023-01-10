import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import { HeaderComponent } from './Views/partial/header/header.component';
import { FooterComponent } from './Views/partial/footer/footer.component';
import { LoginComponent } from './Views/pages/login/login.component';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import { FormsModule } from '@angular/forms' 
// import { ErrorComponent } from './Views/pages/error/error.component';
import { SignupComponent } from './Views/pages/sign-up/sign-up.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import { HomeComponent } from './view/pages/home/home.component';
import { SideBarComponent } from './Views/partial/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { NgOtpInputModule } from 'ng-otp-input';
import { CodeComponent } from './Views/pages/code/code.component';
import { HomeComponent } from './Views/pages/home/home.component';
// import { HomePageComponent } from './views/partial/home-page/home-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    SideBarComponent,
    DashboardComponent,
    CodeComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    // HomePageComponent

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
    NgOtpInputModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
