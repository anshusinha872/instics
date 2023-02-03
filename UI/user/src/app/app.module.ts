import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// import {SliderModule} from 'primeng/slider';
import { HeaderComponent } from './Views/partial/header/header.component';
import { FooterComponent } from './Views/partial/footer/footer.component';
import { LoginComponent } from './Views/pages/login/login.component';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import { FormsModule } from '@angular/forms';
// import { ErrorComponent } from './Views/pages/error/error.component';
import { SignupComponent } from './Views/pages/sign-up/sign-up.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import { HomeComponent } from './view/pages/home/home.component';
import { SideBarComponent } from './Views/partial/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Views/layout/dashboard/dashboard.component';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { HomeComponent } from './Views/pages/home/home.component';
import { CodeComponent } from './Views/pages/code/code.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { DemoComponent } from './Views/pages/demo/demo.component';
import { ProfileComponent } from './Views/pages/profile/profile.component';
import { SubdashboardComponent } from './Views/layout/subdashboard/subdashboard.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PrintComponent } from './Views/pages/print/print.component';
import { CartComponent } from './Views/pages/cart/cart.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';

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
    FooterComponent,
    HeaderComponent,
    DemoComponent,
    HomeComponent,
    ProfileComponent,
    SubdashboardComponent,
    PrintComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    FormsModule,
    PasswordModule,
    ConfirmDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ImageCropperModule,
    SelectButtonModule,
    SliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
