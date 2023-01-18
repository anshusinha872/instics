import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-sideBar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor() {}
  imgPath:string="";
  ngOnInit(): void {
    this.imgPath = 'attachment_edit.png';
  }
}
