import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dateStart:any;
  dateEnd:any;
  status:any;
  constructor(    private route: Router) { }
  logout() {
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }
  chooseStartDate(dateInput:any)
  {
    console.log(dateInput.value);
    this.dateStart = dateInput.value;    

  }
  chooseEndDate(dateInput:any)
  {
    console.log(dateInput.value);    
    this.dateEnd = dateInput.value;    

  }
  clearAllFilter()
  {
    this.dateStart = null;
    this.dateEnd = null;
    this.status = null;
    sessionStorage.setItem('dateStart',this.dateStart);
    sessionStorage.setItem('endDate', this.dateEnd);
    sessionStorage.setItem('completion', this.status);
  }

  submit()
  {
    console.log(this.status);
    sessionStorage.setItem('dateStart',this.dateStart);
    sessionStorage.setItem('endDate', this.dateEnd);
    sessionStorage.setItem('completion', this.status);

  }
  ngOnInit(): void {
  }

}
