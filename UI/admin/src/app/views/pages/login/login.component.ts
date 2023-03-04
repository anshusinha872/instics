import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  value1: string='';
  value2: string='';
  role:string='';
  public userData: any = [];
  public apiStatus: string = '';
  constructor(public route: Router,
    private Loginadmin:LoginService,
    private toastr: ToastrManager,
    ) {}
  ngOnInit(): void {
    this.apiStatus = 'not connected';
  }
  loginadmin() {
    // console.log('LoginComponent.submitUser()');
    // console.log(this.value1);
    // console.log(this.value2);
    // this.router.navigate(['/dashboard']);
    this.apiStatus = 'connected';
    let req = {
      username: this.value1,
      password: this.value2,
      role:this.role,
    };
    this.Loginadmin.loginadmin(req).subscribe((res:any) => {
      console.log(res);
      
      this.apiStatus = 'success';
      if (res.statusCode == 200 && res.data.role==0) {
        sessionStorage.setItem('role', res.data.role);
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('token', res.data.token);
        this.toastr.successToastr('Login Success');
        this.route.navigate(['/admin']);
      }else if(res.statusCode == 200)
      { 
        sessionStorage.setItem('role', res.data.role);
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('token', res.data.token);
        this.toastr.successToastr('Login Success');
        this.route.navigate(['/subadmin']);      
      } 
      else {
        console.log(res);
        this.toastr.errorToastr('Invalid Credentials');
      }
    });
  }
}
