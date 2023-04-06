import { Component, OnInit } from '@angular/core';
import { LaundryService } from 'src/app/services/laundry/laundry.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionService } from 'src/app/services/session/session.service';
@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css'],
})
export class LaundryComponent implements OnInit {
  address: string;
  longitude: number;
  latitude: number;
  useManualAddress: boolean = true;
  completeAddress: string;
  preferredTime: string;
  preferredDate: string;
  newClothName: string = '';
  selectedSection: string = '';
  newClothPrice: string = '';
  sections = [];
  clothDetails = [];
  couponCode: string = '';
  paymentMode: string = '';
  selectedCouponCode: string;
  clothesData = [];
  liveLocationFetch: boolean = false;
  constructor(
    private laundryService: LaundryService,
    private toastr: ToastrManager,
    private sessionService: SessionService
  ) {}
  couponCodeInput: string;
  discountType: string = 'percentage';
  discountValue: number;
  minimumValue: number;
  coupons = [];
  ngOnInit(): void {
    this.laundryService.showLaundryClothServices().subscribe((data) => {
      console.log(data.data);
      this.sections = data.data;
      console.log(this.sections);
    });
    this.getAllCloth();
    // this.openGoogleMaps(30.754393442791773, 76.64086066725359);
    // this.fetchLocation();
    this.laundryService.getAllCoupons().subscribe((data) => {
      console.log(data.data);
      this.coupons = data.data;
    });
  }
  openGoogleMaps(latitude, longitude) {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  }

  addedClothes = [];
  totalQuantity = 0;
  totalPrice = 0;
  discountPrice = 0;
  finalPrice = 0;
  addCloth(cloth) {
    const addedCloth = this.addedClothes.find(
      (c) => c.typeName === cloth.typeName
    );
    if (addedCloth) {
      addedCloth.quantity++;
    } else {
      this.addedClothes.push({ ...cloth, quantity: 1 });
    }
    this.calculateTotal();
    // this.applyCoupon();
    this.updatePrice();
    this.toastr.successToastr('Cloth added to cart');
  }
  removeCloth(cloth) {
    const addedCloth = this.addedClothes.find(
      (c) => c.typeName === cloth.typeName
    );
    if (addedCloth) {
      if (addedCloth.quantity == 1) {
        this.addedClothes.splice(this.addedClothes.indexOf(addedCloth), 1);
      }
      addedCloth.quantity--;
    } else {
      this.addedClothes.push({ ...cloth, quantity: 1 });
    }
    // this.calculateTotal();
    // this.applyCoupon();
    this.updatePrice();
    this.toastr.successToastr('Cloth removed from cart');
  }
  onDeleteSectionClick(id) {
    const req = {
      id: id,
    };
    this.laundryService.deleteLaundryClothSection(req).subscribe((data) => {
      console.log(data);
      this.toastr.successToastr('Section deleted successfully');
      this.ngOnInit();
    });
  }
  calculateTotal() {
    this.totalQuantity = this.addedClothes.reduce(
      (total, cloth) => total + cloth.quantity,
      0
    );
    this.totalPrice = this.addedClothes.reduce(
      (total, cloth) => total + cloth.quantity * cloth.price,
      0
    );
    this.finalPrice = this.totalPrice;

    // this.finalPrice = this.totalPrice-this.discountPrice;
  }

  placeOrder() {
    console.log('Order placed with the following items:');
    console.log(this.completeAddress);
    if (this.completeAddress == undefined) {
      this.toastr.errorToastr('Please enter complete address');
      return;
    }
    if (this.preferredTime == undefined) {
      this.toastr.errorToastr('Please enter preferred time');
      return;
    }
    if (this.preferredDate == undefined) {
      this.toastr.errorToastr('Please enter preferred date');
      return;
    }
    if (this.addedClothes.length == 0) {
      this.toastr.errorToastr('Please add clothes to cart');
      return;
    }
    if (this.latitude == undefined) {
      this.toastr.errorToastr('Please Verify location');
      return;
    }
    if (this.paymentMode == undefined) {
      this.toastr.errorToastr('Please select payment mode');
      return;
    }
    console.log(this.latitude);

    console.log(this.longitude);
    console.log(this.addedClothes);
    console.log('Total Quantity:', this.totalQuantity);
    console.log(this.preferredTime);
    console.log(this.preferredDate);
    console.log('Total Price:', this.totalPrice);
    const req = {
      userId: this.sessionService.get('user_id'),
      address: this.completeAddress,
      latitude: this.latitude,
      longitude: this.longitude,
      clothes: this.addedClothes,
      totalQuantity: this.totalQuantity,
      preferredTime: this.preferredTime,
      preferredDate: this.preferredDate,
      totalPrice: this.totalPrice,
      paymentMode: this.paymentMode,
      discountPrice: this.discountPrice,
      finalPrice: this.finalPrice,
      couponCode: this.selectedCouponCode,
    };
    console.log(req);
    this.laundryService.placeLaundryOrder(req).subscribe((data) => {
      console.log(data);
      if (data.statusCode == 200) {
        this.toastr.successToastr('Order Placed Successfully');
        this.addedClothes = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
        this.preferredTime = undefined;
        this.preferredDate = undefined;
        this.completeAddress = undefined;
        this.latitude = undefined;
        this.longitude = undefined;
        this.paymentMode = undefined;
        this.discountPrice = 0;
        this.finalPrice = 0;
        this.selectedCouponCode = undefined;
        // this.ngOnInit();
      } else {
        this.toastr.errorToastr(data.message);
      }
    });
  }
  newSectionName: string;

  onCreateSectionSubmit() {
    const newSection = { name: this.newSectionName };
    console.log('Creating new section:', newSection);
    this.laundryService
      .createLaundryClothServiceName(newSection)
      .subscribe((data) => {
        if (data.statusCode == 200) {
          this.toastr.successToastr('Section Created');
          this.newSectionName = '';
        } else {
          this.toastr.errorToastr(data.message);
        }
        // console.log(data);
      });
  }
  onAddClothSubmit() {
    // console.log(this.newClothName);
    // console.log(this.newClothPrice);
    // console.log(this.selectedSection);
    const req = {
      name: this.newClothName,
      price: this.newClothPrice,
      sectionName: this.selectedSection,
    };
    // console.log(req);
    this.laundryService.addLaundryClothType(req).subscribe((data) => {
      // console.log(data);
      if (data.statusCode == 200) {
        this.toastr.successToastr('Cloth Added');
        this.newClothName = '';
        this.newClothPrice = '';
        this.selectedSection = '';
      } else {
        this.toastr.errorToastr(data.data);
      }
    });
  }
  getAllCloth() {
    this.laundryService.showClothType().subscribe((data) => {
      console.log(data);
      this.clothesData = data.data;
      console.log('cloth', this.clothesData);
    });
  }
  deleteCloth(id) {
    const req = {
      id: id,
    };
    console.log(req);
    this.laundryService.deleteLaundryClothType(req).subscribe((data) => {
      console.log(data);
      this.toastr.successToastr('Cloth deleted successfully');
      this.ngOnInit();
    });
  }
  isLiveLocationSelected() {
    return !this.useManualAddress;
  }
  toDMS(degrees: number): string {
    const absolute = Math.abs(degrees);
    const degreesInt = Math.floor(absolute);
    const minutes = Math.floor((absolute - degreesInt) * 60);
    const seconds = ((absolute - degreesInt - minutes / 60) * 3600).toFixed(2);
    const direction = degrees >= 0 ? 'N' : 'S'; // Change direction based on sign
    return `${degreesInt}°${minutes}'${seconds}" ${direction}`;
  }
  fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Use position.coords.latitude and position.coords.longitude to get the user's location
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.longitude = lng;
        this.latitude = lat;
        this.openGoogleMaps(lat, lng);
        this.liveLocationFetch = true;
        // this.longitude = this.toDMS(lng);
        // this.latitude = this.toDMS(lat);
        console.log(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  // coupons = [
  //   {
  //     code: 'COUPON10',
  //     discountType: 'percentage',
  //     discountValue: 10,
  //     minimumAmount: 100,
  //   },
  //   {
  //     code: 'COUPON20',
  //     discountType: 'percentage',
  //     discountValue: 20,
  //     minimumAmount: 200,
  //   },
  //   {
  //     code: 'COUPON30',
  //     discountType: 'rupees',
  //     discountValue: 500,
  //     minimumAmount: 300,
  //   },
  //   {
  //     code: 'COUPON40',
  //     discountType: 'rupees',
  //     discountValue: 1000,
  //     minimumAmount: 400,
  //   },
  // ];
  selectedCoupon: any = null;
  applyCoupon() {
    if (!this.selectedCoupon) {
      this.toastr.errorToastr('Please select a coupon');
      return;
    }

    const { discountType, discountValue, minimumAmount } = this.selectedCoupon;

    if (this.totalPrice < minimumAmount) {
      // this.finalPrice = this.totalPrice;
      this.discountPrice = 0;
      this.calculateTotal();
      this.toastr.errorToastr('Minimum amount should be ' + minimumAmount);
      this.selectedCoupon = null;
      return;
    }

    if (discountType === 'percentage') {
      this.finalPrice =
        this.totalPrice - (this.totalPrice * discountValue) / 100;
      this.finalPrice = Math.round(this.finalPrice * 100) / 100;
      this.discountPrice = this.totalPrice - this.finalPrice;
    }

    if (discountType === 'rupees') {
      this.finalPrice = this.totalPrice - discountValue;

      this.discountPrice = this.totalPrice - this.finalPrice;
    }
  }
  selectCoupon(): void {
    if (this.paymentMode == '') {
      this.toastr.errorToastr('Please select payment mode');
      this.selectedCouponCode = '';
      return;
    }
    if (this.paymentMode == 'cash') {
      this.toastr.errorToastr('Coupon not applicable for cash on delivery');
      this.selectedCouponCode = '';
      return;
    }
    if (this.selectedCouponCode == undefined) {
      this.toastr.errorToastr('Please enter coupon code');
      this.selectedCoupon = null;
      return;
    }
    const coupon = this.coupons.find((c) => c.code === this.selectedCouponCode);

    if (coupon) {
      this.selectedCoupon = coupon;
    }
    this.applyCoupon();
  }
  paymentModeChange() {
    console.log('previous', this.paymentMode);
    console.log('Payment mode changed to:', this.paymentMode);
    console.log('after', this.paymentMode);
    if (this.paymentMode == '') {
      // this.toastr.errorToastr('Please select payment mode',);
      this.selectedCouponCode = '';
      this.selectedCoupon = null;
      return;
    }
    if (this.paymentMode == 'cash') {
      this.toastr.infoToastr('Coupon not applicable for cash on delivery');
      this.totalPrice = 0;
      // this.finalPrice = 0;
      this.discountPrice = 0;
      this.calculateTotal();
      this.selectedCouponCode = '';
      this.selectedCoupon = null;
    }
  }
  updatePrice() {
    this.totalPrice = 0;
    this.finalPrice = 0;
    // this.finalPrice = 0;
    this.discountPrice = 0;
    this.selectedCoupon = null;
    this.selectedCouponCode = '';
    this.paymentMode = '';
    this.calculateTotal();
    // this.applyCoupon();
  }
  createCoupon() {
    const req = {
      code: this.couponCodeInput,
      discountType: this.discountType,
      discountValue: this.discountValue,
      minimumAmount: this.minimumValue,
    };
    console.log(req);

    this.laundryService.createCoupon(req).subscribe((data) => {
      console.log(data);
      this.couponCodeInput = '';
      this.discountType = '';
      this.discountValue = 0;
      this.minimumValue = 0;
      this.toastr.successToastr('Coupon created successfully');
      this.ngOnInit();
    });
  }
  deleteCoupon(couponCode) {
    const req = {
      code: couponCode,
    };
    console.log(req);
    this.laundryService.deleteCoupon(req).subscribe((data) => {
      console.log(data);
      this.toastr.successToastr('Coupon deleted successfully');
      this.ngOnInit();
    });
  }
}
