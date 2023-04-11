import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { PrintService } from 'src/app/views/services/print/print.service';

@Component({
  selector: 'app-printadmin',
  templateUrl: './printadmin.component.html',
  styleUrls: ['./printadmin.component.scss']
})
export class PrintadminComponent {
  subadmin: any;
  verified: boolean=false;
  verify: boolean=false;
  reportverify:boolean=false;
  cardverify:boolean=false;
  navbarfixed: boolean=false;
  servicesverify: boolean=false;
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
  
  constructor(private printdata:PrintService,
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
    this.printdata.getPrintservicestatus().subscribe((data:any)=>{
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
  }
   
  paymenthis()
  {
  
      this.verify=true;
      this.verified=true;
      this.reportverify=false;
      this.cardverify=false;
  }

  reportshow(){
    this.reportverify=true;
    this.cardverify=false;
    this.verified=false;
    this.verify=true;
  }
  cardshow(){
    this.cardverify=true;
    this.reportverify=false;
    this.verified=false;
    this.verify=true;
  }

  totalpayment()
  {
    this.printdata.gettotalpayment().subscribe((data:any)=>{
      this.total=data;
      console.log(this.total);
    })
  }
  numberamount(number:any)
  {
    let customeramount={
      number:number,
     }
     this.printdata.getcontactamount(customeramount).subscribe((result:any)=>{

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
    this.printdata.getPrintsatusupdate(serviceData).subscribe((result:any)=>{
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
    this.printdata.getpaymenthistory().subscribe((data:any)=>{
      this.payment=data;
      console.log(this.payment);
    })
  }
  showreport(currrentdate: any){
    // console.log(currrentdate);
    let currentDate={
      currentdate:currrentdate,
      
      }
    this.printdata.getreportSuccessData(currentDate).subscribe((data:any)=>{
      this.successpayment=data;
      console.log(this.successpayment);
    })

    this.printdata.getreportFailData(currentDate).subscribe((data:any)=>{
      this.failpayment=data;
      console.log(this.failpayment);
    })
    this.printdata.getreportTodayorder(currentDate).subscribe((data:any)=>{
      this.todayorder=data;
      console.log(this.todayorder);
    })

    
    this.printdata.getreporttotalpayment(currentDate).subscribe((data:any)=>{
      this.todaypayment=data;
      console.log(this.todaypayment);
    })

    
    
  }

  calculateamount(date1: any,date2: any){
    console.log(date1)
    console.log(date2)
    let dateamount={
     date1:date1,
     date2:date2
    }
    this.printdata.getcalculateamount(dateamount).subscribe((result:any)=>{

      this.amount=result;
      console.log(this.amount);
    })
    
  }
 
}
