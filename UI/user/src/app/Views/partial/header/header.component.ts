import { SessionService } from 'src/app/services/session/session.service';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './../../../services/shared/shared.service';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('dropdown') dropdown: ElementRef;
  greeting: string = '';
  userName: string = '';
  email: string = '';
  user_id: string = '';
  public profileDetails: any = {};
  public userIcon = '';
  contact: string = '';
  changeProfilePic: boolean = false;
  showProfileSection: boolean = false;
  showProfileBtnClicked: boolean = false;
  constructor(
    private sharedService: SharedService,
    private SessionService: SessionService,
    private router: Router,
    private toastr: ToastrManager,
    private userService: UserService
  ) {
    // document.addEventListener('click', this.onDocumentClick.bind(this));
    this.router.events.subscribe((val) => {
      console.log('here');
      const className = this.router.url.split('/')[2];
      console.log('className', className);
      const allItem = document.getElementsByClassName('headerLinksItems');
      for (let i = 0; i < allItem.length; i++) {
        allItem[i].classList.remove('activeLink');
      }
      if (className == 'services') {
        const item = document.getElementsByClassName('homeService');
        console.log('item', item);
        item[0].classList.add('activeLink');
      }
      if (className == 'cart') {
        const item = document.getElementsByClassName('cartService');
        item[0].classList.add('activeLink');
      }
    });
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileName: string = undefined;

  ngOnInit(): void {
    // console.log('router url', this.router.url.split('/')[2]);

    // document.addEventListener('click', this.onDocumentClick.bind(this));
    // document.addEventListener('click', this.onDocumentClick.bind(this));
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      this.greeting = 'Good Morning';
    } else if (curHr < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
    this.getUserData();
  }
  getUserData() {
    this.profileDetails = this.sharedService.getProfileData().data;
    console.log('profile details', this.profileDetails);
    this.userName =
      this.profileDetails.firstName + ' ' + this.profileDetails.lastName;
    this.email = this.profileDetails.email_id;
    this.contact = this.profileDetails.contact;
    this.userIcon = this.profileDetails.profileImage;
    this.user_id = this.profileDetails.user_id;
  }
  navigateTo(data) {
    this.showProfileBtnClicked = false;
    this.showProfileSection = false;
    console.log(this.router.url.split('/')[1] + data);
    this.router.navigate([this.router.url.split('/')[1] + data]);
  }
  uploadImage() {}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
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
  handleChange(event: any) {
    this.imageChangedEvent = event;
    this.fileName = event.target.files[0].name;
  }
  submitProfilePic() {
    let req = new FormData();
    req.append('user_id', this.user_id);
    req.append('fileName', this.fileName);
    req.append('profileImage', this.croppedImage);
    if (this.fileName == undefined) {
      this.toastr.errorToastr('Please select image');
      return;
    }

    this.userService.uploadImage(req).subscribe((res) => {
      if (res.statusCode == 200) {
        this.fileName = undefined;
        this.croppedImage = undefined;
        this.imageChangedEvent = undefined;
        this.toastr.successToastr('Profile image uploaded successfully');
        this.changeProfilePicFun();
        console.log(this.profileDetails);
        const req = {
          user_id: this.user_id,
        };
        this.userService.getUserDetails(req).subscribe((res) => {
          this.profileDetails = res.data;
          this.sharedService.setProfileData(this.profileDetails);
          this.getUserData();
          console.log(this.profileDetails);
        });
      } else {
        this.toastr.errorToastr('Something went wrong');
      }
    });
  }
  logOutUser() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
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
      !this.dropdown.nativeElement.contains(event.target) &&
      !this.changeProfilePic
    ) {
      this.showProfileSection = false;
    }
  }
}
