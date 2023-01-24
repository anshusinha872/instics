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

  constructor(
    private router : Router
  ) {

  }

  ngOnInit(): void {}
  profile() {
    this.router.navigate([this.router.url.split('/')[1]+'/profile']);
  }
}
