import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  title: any;
  year: any;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      const className = this.router.url.split('/')[2];
      const allItem = document.getElementsByClassName('logoContainer');
      for (let i = 0; i < allItem.length; i++) {
        allItem[i].classList.remove('active');
      }
      if (className == 'services') {
        const item = document.getElementsByClassName('homeLogo');
        item[0].classList.add('active');
      }
      if (className == 'category' || className == 'print') {
        const item = document.getElementsByClassName('categoryLogo');
        item[0].classList.add('active');
      }
      if (className == 'cart') {
        const item = document.getElementsByClassName('cartLogo');
        item[0].classList.add('active');
      }
      if (className == 'profile') {
        const item = document.getElementsByClassName('profileLogo');
        item[0].classList.add('active');
      }
    });
  }

  ngOnInit(): void {
    // console.log(this.router.url.split('/')[1]);
  }
  navigate(data) {
    this.router.navigate([data]);
  }
  profile() {
    this.router.navigate([this.router.url.split('/')[1] + '/profile']);
  }
  cart() {
    this.router.navigate([this.router.url.split('/')[1] + '/cart']);
  }
  navigateToCategory() {
    console.log(this.router.url.split('/')[1] + '/category');
    this.router.navigate([this.router.url.split('/')[1] + '/category']);
  }
  navigateToHome() {
    this.router.navigate([this.router.url.split('/')[1] + '/services']);
  }
}
