import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { App } from '@capacitor/app';
// import "firebase/firestore"
import * as firebase from 'firebase'
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
  confirmpassword: string = '';
  password: string = '';
  email: string = '';
  verified: boolean = false;
  verify: any;
  contact: string = '';
  contactForgetNumber: string = '';
  forgetPasswordBox: boolean = false;
  otpReceived: string = '';
  reCaptchaVerifier: any;
  otp: any;
  newPassword: string = '';
  phoneNumberBlock: boolean = true;
  otpEnterBlock: boolean = false;
  passwordEnterBlock: boolean = false;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private route: Router,
    private toastr: ToastrManager,
    private sharedService: SharedService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.apiStatus = 'not connected';
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }

  fgPassword() {
    // this.verified = true;
    this.forgetPasswordBox = true;
    // this.forgotUser();
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
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user_id', res.data.user_id);
        sessionStorage.setItem('email_id', res.data.email_id);
        // sessionStorage.setItem('contact', res.data.firstName+res.data.lastName);
        console.log(res.data);
        const req = {
          user_id: res.data.user_id,
        };
        this.userService.getUserDetails(req).subscribe((res) => {
          // console.log(res.data.data);
          sessionStorage.setItem(
            'Name',
            res.data.data.firstName + ' ' + res.data.data.lastName
          );
          this.sharedService.setProfileData(res.data);
          this.toastr.successToastr('Login Success');
          this.route.navigate(['/dashboard']);
        });
      } else {
        console.log(res);
        this.toastr.errorToastr(res.data);
      }
    });
  }
  navigateback() {
    this.route.navigate(['/home']);
  }
  signUp() {
    console.log(this.route.url);
    this.route.navigate(['/signup']);
  }

  forgotUser() {
    if (this.contact.length != 10) {
      this.toastr.infoToastr('Contact number must be 10 digits');
      return;
    } else {
      let req = {
        contact: this.contact,
      };
      console.log(req);
      this.loginService.checkUser(req).subscribe((res) => {
        this.apiStatus = 'success';
        console.log(res);
        if (res.statusCode == 200) {
          localStorage.setItem('contact', this.contact);
          this.toastr.successToastr('Enter otp sent');
          this.phoneNumberBlock = false;
          this.otpEnterBlock = true;
          this.sendOtp();
          this.verify = true;
        } else {
          this.toastr.errorToastr('number not exist');
        }
      });
    }
  }

  updatePassword() {
    if (this.newPassword.length < 8) {
      this.toastr.infoToastr('Password must be atleast 8 characters');
      return;
    } else {
      this.userData = {
        password: this.newPassword,
        contact: localStorage.getItem('contact'),
      };
      this.loginService.updatePassword(this.userData).subscribe((result) => {
        console.log(result);
        if (result.statusCode == 200) {
          this.toastr.successToastr('password updated successfully');
          this.forgetPasswordBox = false;
          this.phoneNumberBlock = true;
          this.otpEnterBlock = false;
          this.passwordEnterBlock = false;
          this.verified = false;
          this.verify = false;
          this.contact = '';
          this.contactForgetNumber = '';
          this.forgetPasswordBox = false;
          this.otpReceived = '';
          this.reCaptchaVerifier = '';
          this.otp = '';
          this.newPassword = '';
          
        } else {
          this.toastr.errorToastr(result.data);
        }
      });
    }
  }
  sendOtp() {
    const phone_number = '+91' + this.contact;
    firebase.initializeApp(environment.firebase);
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(phone_number, this.reCaptchaVerifier)
      .then((conformationResult) => {
        // this.otpBoxVisible = true;
        
        console.log('otp sent');
        localStorage.setItem(
          'confirmationResult',
          JSON.stringify(conformationResult.verificationId)
        );
        // this.userData = conformationResult;
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }
  validateOtp() {
    this.verify = JSON.parse(
      localStorage.getItem('confirmationResult' || '{}')
    );
    console.log(this.verify);
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        console.log(result);
        console.log('Otp is validated');
        this.phoneNumberBlock = false;
        this.otpEnterBlock = false;
        this.passwordEnterBlock = true;
        // this.updatePassword();
      })
      .catch((error) => {
        window.console.error('Error authenticating phone number:', error);
        window.alert('Incorrect code entered?');
        console.log(error);
      });
  }
}
