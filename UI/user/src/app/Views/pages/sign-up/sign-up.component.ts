import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app' 
import "firebase/auth"
import "firebase/firestore"


var config={
  apiKey: "AIzaSyCPDGJBgD8DLl8f3483pxHfSzJJ92I8fpo",
  authDomain: "otp-verification-dca78.firebaseapp.com",
  projectId: "otp-verification-dca78",
  storageBucket: "otp-verification-dca78.appspot.com",
  messagingSenderId: "912597418594",
  appId: "1:912597418594:web:b676956ef2482c4820073b"
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string = "";
  name2:string="";
  email:string="";
  pass:string = "";
  phoneNumber:string = "";
  reCaptchaVerifier:any;
  verified:boolean=false;
  otp!:string
  verify:any;
  constructor(
    private router: Router
  ) { }
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };


  ngOnInit(){
    firebase.initializeApp(config);
    this.verify=JSON.parse(localStorage.getItem('verificationId')||'{}')
    console.log(this.verify);
  }

  onOtpChange(otpCode:any){
    this.otp=otpCode;
    console.log(this.otp)
   }
  
  getOTP(){
    this.reCaptchaVerifier=new firebase.auth.RecaptchaVerifier('sign-in-button',{size:'invisible'});

    firebase
    .auth()
    .signInWithPhoneNumber(this.phoneNumber,this.reCaptchaVerifier)
    .then((confirmationResult)=>{
      localStorage.setItem('verificationId',JSON.stringify(confirmationResult.verificationId)
      )
      // this.router.navigate(['/code'])
      this.verified=true;
   }).catch((error)=>{
    alert(error.message)
    setTimeout(() => {
      window.location.reload()
    }, 
    5000);
  })
}
  
  handleClick(){
    var credentials=firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp)

    firebase.auth().signInWithCredential(credentials).then((response)=>{
      console.log(response);
      localStorage.setItem('user_data',JSON.stringify(response))
      this.router.navigate(['/dashboard'])
    }).catch((error)=>{
      alert(error.message)
    }) 
  }

}

