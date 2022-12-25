import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/pages/login/login.component';
import { SignUpComponent } from './Views/pages/sign-up/sign-up.component';
import { HeaderComponent } from './Views/partial/header/header.component';
import { FooterComponent } from './Views/partial/footer/footer.component';
import { SideBarComponent } from './Views/partial/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
