import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LaundryService } from 'src/app/views/services/laundry/laundry.service';

@Component({
  selector: 'app-laundryadmin',
  templateUrl: './laundryadmin.component.html',
  styleUrls: ['./laundryadmin.component.scss']
})
export class LaundryadminComponent {
  subadmin: any;
  verified: boolean=false;
  verify: boolean=false;
  reportverify:boolean=false;
  cardverify:boolean=false;
  navbarfixed: boolean=false;
  servicesverify: boolean=false;
  cardverification: boolean=false;
  mymodel:boolean=false;
  service: any;
  payment: any;
  total: any;
  searchText:any;
  p: number = 1;
  // collection: any[] = someArrayOfThings; 
  date1:any;
  date2:any;
  amount: any;
  number:any;
  customeramount: any;
  demoverify=false;
  couponverify=false;
  currrentdate:any;
  successpayment: any;
  failpayment: any;
  Pendingpayment: any;
  todayorder: any;
  todaypayment: any;
  y:any;
  useManualAddress: boolean = true;
  newClothName: string = '';
  selectedSection: string = '';
  newClothPrice: string = '';
  // sections = [];
  sections :any;
  // clothDetails = [];
  clothDetails:any;
  couponCode: string = '';
  paymentMode: string = '';

  // clothesData = [];
  clothesData:any;
  liveLocationFetch: boolean = false;
  laundryService: any;
  selectedCoupon: any;
  selectedCouponCode: string='';
  couponCodeInput: string='';
  discountType: string = 'percentage';
  discountValue: any;
  minimumValue: any;
  coupons :any;

  headingInput:any;
  descriptionInput:any;
  constructor(private laundrydata:LaundryService,
    public route: Router,
     private toastr: ToastrManager
   
    ){
    // this.subadminData.subAdminData().subscribe((data)=>{
    //   this.subadmin=data;
    // })
      
  }
  ngOnInit():void{
    
    this.getservices();
    this.paymenthistory();
    this.totalpayment();

    this.laundrydata.showLaundryClothServices().subscribe((data:any) => {
      console.log(data.data);
      this.sections = data.data;
      console.log(this.sections);
    });
    this.getAllCloth();
    
    this.laundrydata.getAllCoupons().subscribe((data: { data: any; }) => {
      console.log(data.data);
      this.coupons = data.data;
    });
  }

  
  
  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY>100)
    {
      this.navbarfixed=true;
    }
    else{
      this.navbarfixed=false;
    }
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  getservices(){
    this.laundrydata.getlaundryservicestatus().subscribe((data:any)=>{
      this.service=data;
      console.log(this.service);
    })
  }
  dashboard()
  {
    this.verify=false;
    this.verified=false;
    this.reportverify=false;
    this.cardverify=false;
    this.couponverify=false;
    this.cardverification=false;
  }
   
  paymenthis()
  {
  
      this.verify=true;
      this.verified=true;
      this.reportverify=false;
      this.couponverify=false;
      this.cardverify=false;
      this.cardverification=false;
  }

  reportshow(){
    this.reportverify=true;
    this.cardverify=false;
    this.verified=false;
    this.couponverify=false;
    this.cardverification=false;
    this.verify=true;
  }
  cardshow(){
    this.cardverify=true;
    this.reportverify=false;
    this.verified=false;
    this.couponverify=false;
    this.cardverification=false;
    this.verify=true;
  }
  couponshow(){
this.couponverify=true;
this.cardverify=false;
    this.reportverify=false;
    this.verified=false;
    this.cardverification=false;
    this.verify=true;
  }

  displaycards()
  {
    this.cardverification=true;
    this.couponverify=false;
this.cardverify=false;
    this.reportverify=false;
    this.verified=false;
    this.verify=true;
  }

  totalpayment()
  {
    this.laundrydata.gettotalpayment().subscribe((data:any)=>{
      this.total=data;
      console.log(this.total);
    })
  }
  numberamount(number:any)
  {
    let customeramount={
      number:number,
     }
     this.laundrydata.getcontactamount(customeramount).subscribe((result:any)=>{

      this.customeramount=result;
      console.log(this.customeramount);
    })
  }
  updatelaundryservice(mymodel: any){
    if(mymodel==true)
    {
      mymodel=1;
    }
    else{
      mymodel=0;
    }
    let serviceData={
      laundrystatus:mymodel,
      laundry_id:2
      }
    this.laundrydata.getlaundrysatusupdate(serviceData).subscribe((result:any)=>{
      if (result.statusCode == 200) {
      // alert("seller status updated succesfully")
      this.toastr.successToastr('laundry status updated succesfully');
      setTimeout(() => {
      // this.route.navigate(['/home']);
      this.getservices();
      // this.verified=true;
      }, 2000);
      } else {
      this.toastr.errorToastr(result.data);
      // alert(result.data);
      }
      })
         
  }

  paymenthistory()
  {
    this.laundrydata.getpaymenthistory().subscribe((data:any)=>{
      this.payment=data;
      console.log(this.payment);
    })
  }
  showreport(currrentdate: any){
    // console.log(currrentdate);
    let currentDate={
      currentdate:currrentdate,
      
      }
    this.laundrydata.getreportSuccessData(currentDate).subscribe((data:any)=>{
      this.successpayment=data;
      console.log(this.successpayment);
    })

    this.laundrydata.getreportFailData(currentDate).subscribe((data:any)=>{
      this.failpayment=data;
      console.log(this.failpayment);
    })
    this.laundrydata.getreportTodayorder(currentDate).subscribe((data:any)=>{
      this.todayorder=data;
      console.log(this.todayorder);
    })

    
    this.laundrydata.getreporttotalpayment(currentDate).subscribe((data:any)=>{
      this.todaypayment=data;
      console.log(this.todaypayment);
    })

    let x=this.todaypayment;
     var y=x*0.25;
   
    
  }

  calculateamount(date1: any,date2: any){
    console.log(date1)
    console.log(date2)
    let dateamount={
     date1:date1,
     date2:date2
    }
    this.laundrydata.getcalculateamount(dateamount).subscribe((result:any)=>{

      this.amount=result;
      console.log(this.amount);
    })
    
  }
  newSectionName: string='';
  onCreateSectionSubmit() {
    const newSection = { name: this.newSectionName };
    console.log('Creating new section:', newSection);
    this.laundrydata.createLaundryClothServiceName(newSection)
      .subscribe((data: { statusCode: number; message: string; }) => {
        if (data.statusCode == 200) {
          this.toastr.successToastr('Section Created');
          this.newSectionName = '';
        } else {
          this.toastr.errorToastr(data.message);
        }
        // console.log(data);
      });
  }
  onDeleteSectionClick(id: any) {
    const req = {
      id: id,
    };
    this.laundrydata.deleteLaundryClothSection(req).subscribe((data: any) => {
      console.log(data);
      this.toastr.successToastr('Section deleted successfully');
      this.ngOnInit();
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
    this.laundrydata.addLaundryClothType(req).subscribe((data: { statusCode: number; data: string; }) => {
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
    this.laundrydata.showClothType().subscribe((data: { data: any; }) => {
      console.log(data);
      this.clothesData = data.data;
      console.log('cloth', this.clothesData);
    });
  }
  addedClothes:any;
  totalQuantity = 0;
  totalPrice = 0;
  discountPrice = 0;
  finalPrice = 0;
  
  addCloth(cloth: { typeName: any; }) {
    const addedCloth = this.addedClothes.find(
      (c: { typeName: any; }) => c.typeName === cloth.typeName
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
  
  removeCloth(cloth: { typeName: any; }) {
    const addedCloth = this.addedClothes.find(
      (c: { typeName: any; }) => c.typeName === cloth.typeName
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

  calculateTotal() {
    this.totalQuantity = this.addedClothes.reduce(
      (total: any, cloth: { quantity: any; }) => total + cloth.quantity,
      0
    );
    this.totalPrice = this.addedClothes.reduce(
      (total: number, cloth: { quantity: number; price: number; }) => total + cloth.quantity * cloth.price,
      0
    );
    this.finalPrice = this.totalPrice;

    // this.finalPrice = this.totalPrice-this.discountPrice;
  }

  updatePrice(){
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

  deleteCloth(id: any) {
    const req = {
      id: id,
    };
    console.log(req);
    this.laundrydata.deleteLaundryClothType(req).subscribe((data: any) => {
      console.log(data);
      this.toastr.successToastr('Cloth deleted successfully');
      this.ngOnInit();
    });
  }

  createCoupon() {
    const req = {
      code: this.couponCodeInput,
      discountType: this.discountType,
      discountValue: this.discountValue,
      minimumAmount: this.minimumValue,
    };
    console.log(req);

    this.laundrydata.createCoupon(req).subscribe((data: any) => {
      console.log(data);
      this.couponCodeInput = '';
      this.discountType = '';
      this.discountValue = 0;
      this.minimumValue = 0;
      this.toastr.successToastr('Coupon created successfully');
      this.ngOnInit();
    });
  }
  deleteCoupon(couponCode: any) {
    const req = {
      code: couponCode,
    };
    console.log(req);
    this.laundrydata.deleteCoupon(req).subscribe((data: any) => {
      console.log(data);
      this.toastr.successToastr('Coupon deleted successfully');
      this.ngOnInit();
    });
  }

  addcard()
  {

  }
}
