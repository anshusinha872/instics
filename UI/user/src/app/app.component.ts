import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'user';
  currentRoute: string;
  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
      // if (!(val instanceof NavigationEnd)) {
      //   return;
      // }
      // window.scrollTo(0, 0);
    });
  }
}
