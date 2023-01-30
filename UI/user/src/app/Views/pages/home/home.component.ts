import { Component, OnInit } from '@angular/core';
import { documentId } from 'firebase/firestore';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService,
    private toastManager: ToastrManager,
    private router: Router,
  private loginService:LoginService) { }
  ngOnInit(): void {
    // this.getUserData();
    const token = this.sessionService.get('token');
    if(this.authService.tokenExpired(token)){
      console.log('token expired');
      this.toastManager.errorToastr('Session expired, please login again');
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
    else {
      console.log('token is valid');
    }
  }
  getUserData() {
    this.userService.userData().subscribe((res) => {
      console.log(res);
    });
  }
  services() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  }
}
