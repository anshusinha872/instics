import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css'],
})
export class RefundComponent implements OnInit {
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
