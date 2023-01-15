import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ToastrManager } from 'ng6-toastr-notifications';
import { timeInterval } from 'rxjs';
var config = {
  apiKey: 'AIzaSyCPDGJBgD8DLl8f3483pxHfSzJJ92I8fpo',
  authDomain: 'otp-verification-dca78.firebaseapp.com',
  projectId: 'otp-verification-dca78',
  storageBucket: 'otp-verification-dca78.appspot.com',
  messagingSenderId: '912597418594',
  appId: '1:912597418594:web:b676956ef2482c4820073b',
};

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignupComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  contact: string = '';
  reCaptchaVerifier: any;
  verified: boolean = false;
  otp!: string;
  verify: any;
  userData: any;
  checkBox: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrManager
  ) {}
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '45px',
    },
    containerClass: 'd-flex',
  };

  ngOnInit() {
    // firebase.initializeApp(config);
    // this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    // console.log(this.verify);
    console.log(this.checkBox);
  }
  toLogin() {
    this.router.navigate(['/login']);
  }
  // onOtpChange(otpCode: any) {
  //   this.otp = otpCode;
  //   console.log(this.otp);
  // }

  // getOTP() {
  //   this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     'sign-in-button',
  //     { size: 'visible' }

  //   );

  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
  //     .then((confirmationResult) => {
  //       localStorage.setItem(
  //         'verificationId',
  //         JSON.stringify(confirmationResult.verificationId)
  //       );
  //

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert(error.message);

  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 5000);
  //     });
  // }

  // handleClick() {
  //   var credentials = firebase.auth.PhoneAuthProvider.credential(
  //     this.verify,
  //     this.otp
  //   );

  //   firebase
  //     .auth()
  //     .signInWithCredential(credentials)
  //     .then((response) => {
  //       console.log(response);
  //       localStorage.setItem('user_data', JSON.stringify(response));
  //       this.router.navigate(['/home']);
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // }
  submitUser() {
    // console.log(this.checkBox);
    if (this.checkBox == false) {
      this.toastr.errorToastr('Please accept the terms and conditions');
      return;
    }
    if (
      this.firstName == '' ||
      this.email == '' ||
      this.password == '' ||
      this.contact == ''
    ) {
      this.toastr.infoToastr('Please fill all the fields');
      return;
    }
    if (this.password.length < 8) {
      this.toastr.infoToastr('Password must be atleast 8 characters');
      return;
    }
    if (this.contact.length != 10) {
      this.toastr.infoToastr('Contact number must be 10 digits');
      return;
    }

    this.userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      contact: this.contact,
    };
    this.userService.submitUser(this.userData).subscribe((result) => {
      console.log(result);
      if (result.statusCode == 200) {
        this.toastr.successToastr('User Registered Successfully');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      } else {
        this.toastr.errorToastr(result.data);
      }
    });
  }
}
