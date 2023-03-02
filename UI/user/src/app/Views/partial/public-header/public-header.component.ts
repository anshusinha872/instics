import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { SessionService } from 'src/app/services/session/session.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css'],
})
export class PublicHeaderComponent implements OnInit {
  @ViewChild('dropdown') dropdown: ElementRef;
  greeting: string = '';
  userName: string = '';
  email: string = '';
  user_id: string = '';
  public profileDetails: any = {};
  ImageCroppedEvent: any;
  public userIcon = '';
  contact: string = '';
  changeProfilePic: boolean = false;
  showProfileSection: boolean = false;
  showProfileBtnClicked: boolean = false;
  currentRoute: string;

  constructor(
    
    private sharedService: SharedService,
    private SessionService: SessionService,
    private router: Router,
    private toastr: ToastrManager,
    private userService: UserService
  ) {
    
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileName: string = undefined;

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      console.log(val);
      let url = val['url'];
      console.log(url);
    });
    // this.router.events.subscribe((val) => {
    //   // console.log('val', this.router.url);
    //   // const className = this.router.url.split('/')[1];
    //   const className = this.router.url;
    //   // console.log('className', className);
    //   const allItem = document.getElementsByClassName('headerLinksItems');
    //   for (let i = 0; i < allItem.length; i++) {
    //     allItem[i].classList.remove('activeLink');
    //   }
    //   if (className == '/home') {
    //     const item = document.getElementsByClassName('homeService');
    //     // console.log('item', item);
    //     item[0].classList.add('activeLink');
    //   }
    //   if (className == '/about') {
    //     const item = document.getElementsByClassName('cartService');
    //     item[0].classList.add('activeLink');
    //   }
    //   if (className == '/contact') {
    //     const item = document.getElementsByClassName('contactService');
    //     item[0].classList.add('activeLink');
    //   }
    // });
    
  }
  navigateTo(data) {
    this.showProfileBtnClicked = false;
    this.showProfileSection = false;
    // console.log(this.router.url.split('/')[0] + data);
    this.router.navigate([this.router.url.split('/')[0] + data]);
  }
  uploadImage() {}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event) {
    this.croppedImage = event.base64.split(',')[1];
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }
  
  changeProfilePicFun() {
    this.changeProfilePic = !this.changeProfilePic;
  }
  openProfile() {
    this.showProfileBtnClicked = true;
    this.showProfileSection = !this.showProfileSection;
  }
  closeProfile() {
    // this.showProfileSection = false;
  }
  handleChangeProfile() {
    console.log(this.showProfileBtnClicked);
    console.log(this.dropdown.nativeElement.contains(event.target));
    if (
      this.showProfileBtnClicked &&
      !this.dropdown.nativeElement.contains(event.target)
    ) {
      this.showProfileSection = false;
    }
  }
}
