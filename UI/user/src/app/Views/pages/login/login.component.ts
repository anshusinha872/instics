import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // value3: string = '';
  password: string = '';
  email:string = '';
  constructor(private userService: UserService,
    private loginService: LoginService,
    private route:Router) { }

  ngOnInit(): void {}
  loginUser() {
    console.log('login');
    let req = {
      email_id: this.email,
      password: this.password,
    }
    console.log(req);
    this.loginService.loginUser(req).subscribe((res) => {
      console.log(res);
      if (res.statusCode == 200) {
        localStorage.setItem('email_id', this.email);
        this.route.navigate(['/home']);
      }
    });
    // this.userService.getUser(req).subscribe((res) => {
    //   console.log(res);
    //   console.log(res[0].password);
    // });
  }
}
