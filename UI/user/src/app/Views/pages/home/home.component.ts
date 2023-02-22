import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  verified: boolean = false;
  navbarfixed: boolean = false;
  projectcount: number = 0;
  //same process
  accuratecount: number = 0;
  clientcount: number = 0;
  customerfeedback: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.slideImage();
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }
  slideImage() {
    let carouselItems = document.getElementsByClassName('item1');
    // console.log(carouselItems);
    for (let i = 0; i < carouselItems.length; i++) {
      // console.log(carouselItems[i].classList);
      // console.log(i);
      // if (carouselItems[i].classList.contains('active')) {
      //   carouselItems[(i + 1) % carouselItems.length].classList.remove('mx-2');
      //   carouselItems[i].classList.add('mx-2');
      // }
    }
  }
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
  register() {
    this.router.navigate(['/signup']);
  }
  navigateToAbout() {
    this.router.navigate(['/about']);
  }
  home() {
    this.verified = false;
  }
  projectcountstop: any = setInterval(() => {
    this.projectcount++;
    //we need to stop this at  particular point; will use if condition
    if (this.projectcount == 1000) {
      //clearinterval will stop tha function
      clearInterval(this.projectcountstop);
    }
  }, 10); //10 is milisecond you can control it

  accuratecountstop: any = setInterval(() => {
    this.accuratecount++;
    if (this.accuratecount == 200) {
      clearInterval(this.accuratecountstop);
    }
  }, 10);
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToContact() {
    this.router.navigate(['/contact']);
  }
  navigate(data) {
    this.router.navigate([data]);
  }
  clientcountstop: any = setInterval(() => {
    this.clientcount++;
    if (this.clientcount == 1000) {
      clearInterval(this.clientcountstop);
    }
  }, 10);

  customerfeedbackstop: any = setInterval(() => {
    this.customerfeedback++;
    if (this.customerfeedback == 99) {
      clearInterval(this.customerfeedbackstop);
    }
  }, 10);

  //conclusion: we have use
  //string interpolation
  //setInterval function
  //()=> arrow function
  //clearInterval
  //creating variable
}
