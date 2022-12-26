import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-banner',
  templateUrl: './side-banner.component.html',
  styleUrls: ['./side-banner.component.css'],
})
export class SideBannerComponent implements OnInit {
  constructor() {}
  imgPath:string="";
  ngOnInit(): void {
    this.imgPath = 'attachment_edit.png';
  }
}
