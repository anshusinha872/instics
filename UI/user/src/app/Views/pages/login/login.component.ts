import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  value3: string = '';
  password: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  loginUser() {
    console.log('login');
    let req = {
      user_id:1,
    }
    this.userService.getUser(req).subscribe((res) => {
      console.log(res);
      console.log(res[0].password);
    });
  }
}
