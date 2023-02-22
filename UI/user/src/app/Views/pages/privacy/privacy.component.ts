import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent implements OnInit {
  constructor(
    private location: Location,
  ) {}

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
