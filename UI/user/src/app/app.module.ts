import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from './Views/partial/header/header.component';
import { FooterComponent } from './Views/partial/footer/footer.component';
import { LoginComponent } from './Views/pages/login/login.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './Views/pages/sign-up/sign-up.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SideBarComponent } from './Views/partial/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Views/layout/dashboard/dashboard.component';
import { environment } from 'src/environments/environment.prod';
import { ServicesComponent } from './Views/pages/services/services.component';
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
import { HomePageComponent } from './Views/pages/home/home.component';
import { AboutComponent } from './Views/pages/about/about.component';
import { CarouselModule } from 'primeng/carousel';
import { ContactComponent } from './Views/pages/contact/contact.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CategoryComponent } from './Views/pages/category/category.component';
import { PrivacyComponent } from './Views/pages/privacy/privacy.component';
import { TocComponent } from './Views/pages/toc/toc.component';
import { CookiesPolicyComponent } from './Views/pages/cookies-policy/cookies-policy.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RefundComponent } from './Views/pages/refund/refund.component';

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
    ServicesComponent,
    ProfileComponent,
    SubdashboardComponent,
    PrintComponent,
    CartComponent,
    HomePageComponent,
    AboutComponent,
    ContactComponent,
    CategoryComponent,
    PrivacyComponent,
    TocComponent,
    CookiesPolicyComponent,
    RefundComponent,
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
    // AngularEmojisModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ImageCropperModule,
    SelectButtonModule,
    SliderModule,
    CarouselModule,
    InputTextareaModule,
    InputNumberModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
