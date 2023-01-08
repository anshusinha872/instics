import { Component, OnInit } from '@angular/core';
import { documentId } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   
  // services()
  // {
  //   document.getElementById("services").scrollIntoView({behavior:'smooth'})
  // }
}
