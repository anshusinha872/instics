import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public currentRoute: string;
  public displayProfile = false;
  constructor(
    private router: Router,
    private AuthService: AuthService,

    private toastr: ToastrManager,
    private LoginService: LoginService,
    private sessionService: SessionService
  ) {
    this.currentRoute = this.router.url;
    // console.log(this.currentRoute);
  }

  ngOnInit(): void {
    const token = this.sessionService.get('token');
    if (this.AuthService.tokenExpired(token)) {
      // console.log('token expired');
      this.toastr.errorToastr('Session expired, please login again');
      this.LoginService.logout();
      this.router.navigate(['/login']);
    }
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
      // console.log(this.currentRoute);
    });
  }
}
