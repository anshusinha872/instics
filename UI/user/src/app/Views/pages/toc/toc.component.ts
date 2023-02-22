import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css'],
})
export class TocComponent implements OnInit {
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
