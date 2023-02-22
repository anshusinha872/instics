import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-cookies-policy',
  templateUrl: './cookies-policy.component.html',
  styleUrls: ['./cookies-policy.component.css'],
})
export class CookiesPolicyComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }
  navigateback() {
    this.location.back();
  }
}
