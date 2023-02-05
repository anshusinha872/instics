import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionService } from 'src/app/services/session/session.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/services/order/order.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrManager,
    private sessionService: SessionService,
    private LoginService: LoginService,
    private AuthService: AuthService,
    private location: Location,
    private orderService: OrderService,
  ) {}
  imageChangedEvent: any = '';
  croppedImage: any = '';
  user_id: string = '';
  fileName: string = undefined;
  public showProfileDetails: boolean = false;
  public profileDetails: any = {};
  public currentRoute: string = '';
  public showOrderDetails = false;
  public OrderList = [];
  ngOnInit(): void {
    const token = this.sessionService.get('token');
    if (this.AuthService.tokenExpired(token)) {
      console.log('token expired');
      this.toastr.errorToastr('Session expired, please login again');
      this.LoginService.logout();
      this.router.navigate(['/login']);
    }
    this.currentRoute = this.router.url;

    this.showProfileDetails = false;
    // this.user_id = sessionStorage.getItem('user_id');
    this.user_id = this.sessionService.get('user_id');
    if (this.user_id == null) {
      this.toastr.errorToastr('Please login to continue');
      this.LoginService.logout();
      this.router.navigate(['/login']);
    }
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
    console.log(this.currentRoute);
    // this.router.navigate(['/dashboard']);
    this.location.back();
  }
  showDetails() {
    this.showProfileDetails = !this.showProfileDetails;
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
  showOrderDetailsFun() {
    if (this.showOrderDetails == false) {
      const user_id = this.sessionService.get('user_id');
      const req = {
        user_id: user_id,
      };
      this.orderService.getOrderHistory(req).subscribe((res) => {
        if (res.statusCode == 200) {
          this.toastr.successToastr('Order history fetched successfully');
          this.OrderList = res.data;
        }
        else {
          this.toastr.errorToastr('Something went wrong');
        }
      });
    }
    this.showOrderDetails = !this.showOrderDetails;
  }
}
