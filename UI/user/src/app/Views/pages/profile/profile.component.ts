import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router) {}
  public showProfileDetails: boolean = false;
  ngOnInit(): void {
    this.showProfileDetails = false;
  }
  navigateTodashboard() {
    this.router.navigate(['/dashboard']);
  }
  showDetails() {
    this.showProfileDetails = !this.showProfileDetails;
    console.log('showDetails');
  }
  uploadImage() {}
}
