import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public currentRoute: string;
  constructor(private router: Router) {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
      // console.log(this.currentRoute);
    });
   }
}
