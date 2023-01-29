import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  value1: string='';
  value2: string='';
  constructor(public router: Router) {}
  ngOnInit(): void {
  }
  submitUser() {
    // console.log('LoginComponent.submitUser()');
    console.log(this.value1);
    console.log(this.value2);
    this.router.navigate(['/dashboard']);
  }
}
