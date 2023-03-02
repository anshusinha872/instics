import { SharedService } from './../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
// import { documentId } from 'firebase/firestore';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { App } from '@capacitor/app';
@Component({
  selector: 'services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService,
    private toastManager: ToastrManager,
    private router: Router,
    private loginService: LoginService,
    private sharedService: SharedService
  ) {}
  public userName = '';
  public profileDetails: any = {};
  public greeting = '';
  public userIcon = '';
  ngOnInit(): void {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
    var today = new Date();
    var curHr = today.getHours();
    // this.profileDetails = this.sharedService.getProfileData().data;
    this.profileDetails = this.sharedService.getProfileData().data;
    this.userName =
      this.profileDetails.firstName + ' ' + this.profileDetails.lastName;
    this.userIcon = this.profileDetails.profileImage;
    if (curHr < 12) {
      this.greeting = 'Good Morning';
    } else if (curHr < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
    const token = this.sessionService.get('token');
    if (this.authService.tokenExpired(token)) {
      // console.log('token expired');
      this.toastManager.errorToastr('Session expired, please login again');
      this.loginService.logout();
      this.router.navigate(['/login']);
    } else {
      console.log('token is valid');
    }
  }
  ngAfterViewInit() {
    // this.profileDetails = this.sharedService.getProfileData().data;
    // this.userName = this.profileDetails.firstName+' '+this.profileDetails.lastName
    // this.userIcon = this.profileDetails.profileImage;
  }
  getUserData() {
    this.userService.userData().subscribe((res) => {
      console.log(res);
    });
  }
  services() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  }
  redirect(data) {
    this.router.navigate([this.router.url.split('/')[1] + data]);
  }
  availableSoonMsg() {
    this.toastManager.infoToastr('This feature is coming soon');
  }
}
