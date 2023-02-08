import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { PrintsellerComponent } from './views/pages/printseller/printseller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   
    PrintsellerComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PasswordModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    // NgModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
