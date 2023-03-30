import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    
  }
  navigateback() {
    this.location.back();
  }
}
