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
  newClothName:string='';
  selectedSection:string='';
  newClothPrice:string='';
  sections=[];
  clothDetails=[];
  clothesData=[];
  constructor(
    private laundryService: LaundryService,
    private toastr: ToastrManager,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.laundryService.showLaundryClothServices().subscribe((data)=>{
      console.log(data.data);
      this.sections=data.data;
      console.log(this.sections);
    });
    this.getAllCloth();
    // this.openGoogleMaps(30.754393442791773, 76.64086066725359);
    this.fetchLocation();
  }
  openGoogleMaps(latitude, longitude) {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  }

  addedClothes = [];
  totalQuantity = 0;
  totalPrice = 0;

  addCloth(cloth) {
    const addedCloth = this.addedClothes.find((c) => c.typeName === cloth.typeName);
    if (addedCloth) {
      addedCloth.quantity++;
    } else {
      this.addedClothes.push({ ...cloth, quantity: 1 });
    }
    this.calculateTotal();
    this.toastr.successToastr('Cloth added to cart',);
  }
  removeCloth(cloth){
    const addedCloth = this.addedClothes.find((c) => c.typeName === cloth.typeName);
    if (addedCloth) {
      if(addedCloth.quantity==1){
        this.addedClothes.splice(this.addedClothes.indexOf(addedCloth),1);
      }
      addedCloth.quantity--;
    } else {
      this.addedClothes.push({ ...cloth, quantity: 1 });
    }
    this.calculateTotal();
    this.toastr.successToastr('Cloth removed from cart',);
  }
  onDeleteSectionClick(id){
    const req ={
      'id':id,
    };
    this.laundryService.deleteLaundryClothSection(req).subscribe((data)=>{
      console.log(data);
      this.toastr.successToastr('Section deleted successfully',);
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
  }

  placeOrder() {
    console.log('Order placed with the following items:');
    console.log(this.completeAddress);
    console.log(this.latitude);
    console.log(this.longitude);
    console.log(this.addedClothes);
    console.log('Total Quantity:', this.totalQuantity);
    console.log(this.preferredTime);
    console.log(this.preferredDate);
    console.log('Total Price:', this.totalPrice);
    const req = {
      'userId': this.sessionService.get('user_id'),
      'address':this.completeAddress,
      'latitude':this.latitude,
      'longitude':this.longitude,
      'clothes':this.addedClothes,
      'totalQuantity':this.totalQuantity,
      'preferredTime':this.preferredTime,
      'preferredDate':this.preferredDate,
      'totalPrice':this.totalPrice,

    };
    console.log(req);
    this.laundryService.placeLaundryOrder(req).subscribe((data)=>{
      console.log(data);
      if(data.statusCode == 200){
        this.toastr.successToastr('Order Placed Successfully',);
        this.addedClothes = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
      }
      else{
        this.toastr.errorToastr(data.message,);
      }
    });
  }
  newSectionName: string;

  onCreateSectionSubmit() {
    const newSection = { name: this.newSectionName };
    console.log('Creating new section:', newSection);
    this.laundryService.createLaundryClothServiceName(newSection).subscribe(
      (data) => {
        if(data.statusCode == 200){
          this.toastr.successToastr('Section Created',);
          this.newSectionName = '';
        }
        else{
          this.toastr.errorToastr(data.message,);
        }
        // console.log(data);
      }
    );
  }
  onAddClothSubmit(){
    // console.log(this.newClothName);
    // console.log(this.newClothPrice);
    // console.log(this.selectedSection);
    const req = {
      'name':this.newClothName,
      'price':this.newClothPrice,
      'sectionName':this.selectedSection
    };
    // console.log(req);
    this.laundryService.addLaundryClothType(req).subscribe((data)=>{
      // console.log(data);
      if(data.statusCode == 200){
        this.toastr.successToastr('Cloth Added',);
        this.newClothName = '';
        this.newClothPrice = '';
        this.selectedSection = '';
      }
      else{
        this.toastr.errorToastr(data.data);
      }
    })
  }
  getAllCloth(){
    this.laundryService.showClothType().subscribe((data)=>{
      console.log(data);
      this.clothesData = data.data;
      console.log('cloth',this.clothesData);
    })
  }
  deleteCloth(id){
    const req = {
      'id':id
    };
    console.log(req);
    this.laundryService.deleteLaundryClothType(req).subscribe((data)=>{
      console.log(data);
      this.toastr.successToastr('Cloth deleted successfully',);
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
      navigator.geolocation.getCurrentPosition(position => {
        // Use position.coords.latitude and position.coords.longitude to get the user's location
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.longitude = lng;
        this.latitude = lat;
        this.openGoogleMaps(lat, lng);

        // this.longitude = this.toDMS(lng);
        // this.latitude = this.toDMS(lat);
        console.log(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
}
