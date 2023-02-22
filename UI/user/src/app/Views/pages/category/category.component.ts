import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private location: Location,
    private router: Router
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
  navigateback() {
    console.log('navigateback');
    this.location.back();
  }
  redirect(data) {
    // console.log(this.router.url.split('/')[1] + data);
    this.router.navigate([this.router.url.split('/')[1] + data]);
  }
}
