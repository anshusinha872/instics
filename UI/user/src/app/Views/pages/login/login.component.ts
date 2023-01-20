import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/services/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userData: any = [];
  public apiStatus: string = '';
  password: string = '';
  email: string = '';
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private route: Router,
    private toastr: ToastrManager,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.apiStatus = 'not connected';
  }
  loginUser() {
    this.apiStatus = 'connected';
    console.log('login');
    let req = {
      email_id: this.email,
      password: this.password,
    };
    console.log(req);
    this.loginService.loginUser(req).subscribe((res) => {
      this.apiStatus = 'success';
      console.log(res);
      if (res.statusCode == 200) {
        localStorage.setItem('email_id', this.email);
        this.toastr.successToastr('Login Success');
        this.route.navigate(['/home']);
      } else {
        this.toastr.errorToastr('Invalid Credentials');
      }
      // this.userService.userData().subscribe((res) => {
      //   console.log(res);
      //   this.userData = res;
      //   console.log(this.userData);
      // });
    });
  }
  signUp() {
    console.log(this.route.url);
    this.route.navigate(['/signup']);
  }
}
