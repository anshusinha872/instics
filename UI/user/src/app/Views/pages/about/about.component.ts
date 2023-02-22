import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  // navbarfixed: boolean = false;
  constructor(private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }
  // @HostListener('window:scroll', ['$event']) onscroll() {
  //   if (window.scrollY > 100) {
  //     this.navbarfixed = true;
  //   } else {
  //     this.navbarfixed = false;
  //   }
  // }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateback() {
    console.log('navigateback');
    this.location.back();
  }
  
}
