import { Component, OnInit } from '@angular/core';
import { documentId } from 'firebase/firestore';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
      this.userService.userData().subscribe((res) => {
        console.log(res);
      });
  }
  // services()
  // {
  //   document.getElementById("services").scrollIntoView({behavior:'smooth'})
  // }
}
