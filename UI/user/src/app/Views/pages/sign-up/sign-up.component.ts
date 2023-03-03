import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';
// import "firebase/firestore"
import * as firebase from 'firebase'
// import firebase from 'firebase/compat/app';
// import 'firebase/auth';
// import 'firebase/firestore';
import { ToastrManager } from 'ng6-toastr-notifications';
import { App } from '@capacitor/app';
import { timeInterval } from 'rxjs';
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
  recaptchaVerifier;
  verified: boolean = false;
  otp: string;
  verify: any;
  userData: any;
  checkBox: boolean = false;
  otpBoxVisible: boolean = false;
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
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
    firebase.initializeApp(environment.firebase);
    // firebase.initializeApp(config);
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    // console.log(this.verify);
    // console.log(this.checkBox);
  }
  toLogin() {
    this.router.navigate(['/login']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  onOtpChange(otpCode: any) {
    this.otp = otpCode;
    // console.log(this.otp);
  }

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

  handleClick() {
    // var credentials = firebase.auth.PhoneAuthProvider.credential(
    //   this.verify,
    //   this.otp
    // );
    // console.log(credentials);
    // firebase
    //   .auth()
    //   .signInWithCredential(credentials)
    //   .then((response) => {
    //     console.log(response);
    //     localStorage.setItem('user_data', JSON.stringify(response));
    //     this.router.navigate(['/home']);
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  }
  submitUser() {
    // console.log(this.contact);
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
    // this.contact = '+91' + this.contact;
    const contactNumber = '+91' + this.contact;
    // console.log(this.contact);
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(contactNumber, this.recaptchaVerifier)
      .then((conformationResult) => {
        this.otpBoxVisible = true;
        localStorage.setItem(
          'confirmationResult',
          JSON.stringify(conformationResult.verificationId)
        );
        // this.userData = conformationResult;
      })
      .catch((error) => {
        // console.log(error);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
    // this.otpBoxVisible = true;
    // this.userData = {
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   email: this.email,
    //   password: this.password,
    //   contact: this.contact,
    // };
    // this.userService.submitUser(this.userData).subscribe((result) => {
    //   console.log(result);
    //   if (result.statusCode == 200) {
    //     this.toastr.successToastr('User Registered Successfully');
    //     setTimeout(() => {
    //       this.router.navigate(['/home']);
    //     }, 2000);
    //   } else {
    //     this.toastr.errorToastr(result.data);
    //   }
    // });
  }
  validateOtp() {
    this.verify = JSON.parse(
      localStorage.getItem('confirmationResult' || '{}')
    );
    // console.log(this.verify);
    // console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // console.log(result);
        // console.log('Otp is validated');
        // this.isOtpValidated = true;
        // this.hideOtpInput = true;
        // this.savePass = true;
        this.userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          contact: this.contact,
        };
        this.userService.submitUser(this.userData).subscribe((result) => {
          // console.log(result);
          if (result.statusCode == 200) {
            this.toastr.successToastr('User Registered Successfully');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.router.navigate(['/register']);
            this.toastr.errorToastr(result.data);
          }
        });
      })
      .catch((error) => {
        window.console.error('Error authenticating phone number:', error);
        window.alert('Incorrect code entered?');
        // console.log(error);
      });
  }
}
