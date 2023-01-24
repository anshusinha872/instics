import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrManager
  ) {}
  imageChangedEvent: any = '';
  croppedImage: any = '';
  user_id: string = '';
  fileName: string = undefined;
  public showProfileDetails: boolean = false;
  public profileDetails: any = {};
  ngOnInit(): void {
    this.showProfileDetails = false;
    this.user_id = sessionStorage.getItem('user_id');
    console.log(this.user_id);
    const req = {
      user_id: this.user_id,
    };
    this.userService.getUserDetails(req).subscribe((res) => {
      this.profileDetails = res.data;
      console.log(this.profileDetails);
    });
  }
  navigateTodashboard() {
    this.router.navigate(['/dashboard']);
  }
  showDetails() {
    this.showProfileDetails = !this.showProfileDetails;
    // console.log('showDetails');
  }
  uploadImage() {}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    // console.log(event);
    this.croppedImage = event.base64.split(',')[1];
    // console.log(this.croppedImage);
    // console.log(this.croppedImage);
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
    this.userService.uploadProfileImage(req).subscribe((res) => {
      if (res.statusCode == 200) {
        this.fileName = undefined;
        this.croppedImage = undefined;
        this.imageChangedEvent = undefined;
        this.toastr.successToastr('Profile image uploaded successfully');
        const req = {
          user_id: this.user_id,
        };
        this.userService.getUserDetails(req).subscribe((res) => {
          this.profileDetails = res.data;
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
}
