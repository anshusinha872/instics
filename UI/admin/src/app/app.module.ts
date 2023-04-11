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
import { AdminComponent } from './views/pages/admin1/admin/admin.component';
import {HttpClientModule} from '@angular/common/http'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
// import { SidenavComponent } from './views/partial/sidenav/sidenav/sidenav.component';
// import { HomeComponent } from './views/pages/home/home/home.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToastrModule } from 'ng6-toastr-notifications';
import { LaundryadminComponent } from './views/pages/laundryadmin/laundryadmin/laundryadmin.component';
import {NgxPrintModule} from 'ngx-print';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrintadminComponent } from './views/pages/printadmin/printadmin/printadmin.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, HeaderComponent, FooterComponent,
    SubAdminComponent,
    AdminComponent,
    LaundryadminComponent,
    PrintadminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    CalendarModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule,
    MatSidenavModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxPrintModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
