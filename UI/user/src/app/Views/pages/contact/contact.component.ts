import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  public name: string = '';
  public email: string = '';
  public message: string = '';
  public contactNumber: string = '';
  constructor(
    private toastr: ToastrManager,
    private userService: UserService,
    private location: Location
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
  submitMessage() {
    if (this.name === '') {
      this.toastr.errorToastr('Please enter your name');
      return;
    }
    if (this.email === '') {
      this.toastr.errorToastr('Please enter your email');
      return;
    }
    if (this.message === '') {
      this.toastr.errorToastr('Please enter your message');
      return;
    }
    if (this.contactNumber === '') {
      this.toastr.errorToastr('Please enter your contact number');
      return;
    }
    if (this.message.length > 500) {
      this.toastr.errorToastr('Message should not be more than 500 characters');
      return;
    }
    // console.log(this.name);
    // console.log(this.email);
    // console.log(this.message);
    // console.log(this.contactNumber);
    const req = {
      name: this.name,
      email: this.email,
      message: this.message,
      contactNumber: this.contactNumber,
    };
    this.userService.submitQueryRequest(req).subscribe((res) => {
      console.log(res);
      this.toastr.infoToastr('Query sent successfully');
      this.toastr.infoToastr('Our team will contact you ASAP !');
      this.message = '';
      this.name = '';
      this.email = '';
      this.contactNumber = '';
    });
  }
  navigateback() {
    console.log('navigateback');
    this.location.back();
  }
}
