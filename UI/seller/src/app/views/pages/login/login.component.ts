import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrintService } from '../../../service/pdfService/print.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  value1: string = '';
  value2: string = '';
  constructor(
    public router: Router,
    private Loginseller: PrintService,
    private route: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit(): void {}
  submitUser() {
    // console.log('LoginComponent.submitUser()');
    console.log(this.value1);
    console.log(this.value2);
    this.router.navigate(['/dashboard']);
  }

  loginseller() {
    // console.log('LoginComponent.submitUser()');
    // console.log(this.value1);
    // console.log(this.value2);
    // this.router.navigate(['/dashboard']);
    // this.apiStatus = 'connected';
    let req = {
      username: this.value1,
      password: this.value2,
      // role:this.role,
    };

    // this.Loginseller.printseller(req).subscribe((res:any) => {
    //   if (res.statusCode == 200) {
    //     sessionStorage.setItem('token', res.data.token);
    //   } else {
    //     console.log(res);
    //     this.toastr.errorToastr('Invalid Credentials');
    //   }
    // });
    
    this.Loginseller.loginseller(req).subscribe((res: any) => {
      console.log(res);

      // this.apiStatus = 'success';
      if (res.statusCode == 200) {
        // console.log(res.data.token);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('sellerId',res.data.sellerId);
        this.route.navigate(['/dashboard']);
      } else {
        console.log(res);
        this.toastr.errorToastr('Invalid Credentials');
      }
    });
  }
}
