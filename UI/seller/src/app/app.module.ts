import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DashboardComponent } from './views/layout/dashboard/dashboard.component';
import { SubdashboardComponent } from './views/layout/subdashboard/subdashboard.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './views/partial/header/header/header.component';
import { PdfListComponent } from './views/pages/pdfList/pdf-list.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ToastrModule } from 'ng6-toastr-notifications';
import { LaundryComponent } from './views/pages/laundry/laundry.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SubdashboardComponent,
    HeaderComponent,
    PdfListComponent,
    LaundryComponent,
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
    ButtonModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ToastrModule.forRoot(),
    DialogModule,
    DropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
