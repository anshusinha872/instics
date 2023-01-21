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
  confirmpassword:string='';
  password: string = '';
  email: string = '';
  verified:boolean=false;
  varify:boolean=false;
  contact: string = '';
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

  fgPassword()
  {
    this.verified=true;
  }

  loginUser() {
    this.apiStatus = 'connected';
    let req = {
      email_id: this.email,
      password: this.password,
    };
    this.loginService.loginUser(req).subscribe((res) => {
      this.apiStatus = 'success';
      if (res.statusCode == 200) {
        // localStorage.setItem('token', res.data.token);
        // localStorage.setItem('user_id', res.data.user_id);
        // localStorage.setItem('user_name', res.data.user_name);
        console.log(res);
        localStorage.setItem('email_id', this.email);
        this.toastr.successToastr('Login Success');
        this.route.navigate(['/home']);
      } else {
        console.log(res);
        this.toastr.errorToastr('Invalid Credentials');
      }
    });
  }

  signUp() {
    console.log(this.route.url);
    this.route.navigate(['/signup']);
  }

  forgotUser()
  {
    if (this.contact.length != 10) {
      this.toastr.infoToastr('Contact number must be 10 digits');
      return;
    }
    else{

      this.apiStatus = 'connected';
      console.log('login');
      let req = {
        contact: this.contact,
        // password: this.password,
      };
      console.log(req);
      this.userService.forgotUser(req).subscribe((res) => {
        this.apiStatus = 'success';
        console.log(res);
        if (res.statusCode == 200) {
          localStorage.setItem('contact', this.contact);
          this.toastr.successToastr('number exists');
          this.varify=true;
        } else {
          this.toastr.errorToastr('number not exist');
        }
        // this.userService.userData().subscribe((res) => {
        //   console.log(res);
        //   this.userData = res;
        //   console.log(this.userData);
        // });
      });
    }

    
  }

  updatePassword(){
    if (this.password.length < 8) {
      this.toastr.infoToastr('Password must be atleast 8 characters');
      return;
    }
 else{

   if(this.confirmpassword!=this.password)
   {
     this.toastr.errorToastr('confirm password is not matched');
   }
   else{
   this.userData = {
     password: this.password,
     contact: localStorage.getItem('contact'),
   };
   this.userService.updatePassword(this.userData).subscribe((result) => {
     console.log(result);
     if (result.statusCode == 200) {
       this.toastr.successToastr('password update successfully');
       setTimeout(() => {
        //  this.route.navigate(['/sign']);
        this.verified=false;
       }, 2000);
     } else {
       this.toastr.errorToastr(result.data);
     }
   });
 }
 }
  }

}
