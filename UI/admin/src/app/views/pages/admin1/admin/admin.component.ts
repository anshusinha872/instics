import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/views/services/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LaundryService } from 'src/app/views/services/laundry/laundry.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  subadmin: any;
  verified: boolean=false;
  verify: boolean=false;
  sellerverify:boolean=false;
  navbarfixed: boolean=false;
  servicesverify: boolean=false;
  admin: any;
  count: any;
  scount: any;
  status:string='';
  // du1:any;
  // du2:any;
  // cu1:any;
  // cu2:any;
  // dl1:any;
  // dl2:any;
  // cl1:any;
  // cl2:any;
  // subadmin:any;
  // closeResult:string='';
  username: string = '';
  password: string = '';
  role:string='';
  user: any;
  searchText:any;
  seller: any;
  service: any;

  // verified:boolean=false;



  // deleteuser:string='';
  // deleteseller:string='';
  // createuser:string='';
  // createseller:string='';
  // selectedItem:any;
  // userData:any;

  constructor(private adminData:AdminService,public route: Router, private toastr: ToastrManager
    ,private laundryService:LaundryService
    ){
    // this.subadminData.subAdminData().subscribe((data)=>{
    //   this.subadmin=data;
    // })

  }



  ngOnInit():void{
    if(sessionStorage.getItem('role'))
    {

    }
    this.getData();
    this.getadminData();
    this.getuserCount();
    this.getsellerCount();
    this.getuserData();
    this.getsellerData();
    this.getservices();
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
  title = 'admin-panel-layout';
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  sendMail(){
    const data={
      "mail":"anshusinha872@gmail.com"
    };
    this.laundryService.sendMail(data).subscribe((data:any)=>{
      console.log(data);
    })

  }
  getuserData(){

    this.adminData.userData().subscribe((data:any)=>{
        this.user=data;
        console.log(data);
    })
  }

  getsellerData()
  {
    this.adminData.allsellerData().subscribe((data:any)=>{
   this.seller=data;
   console.log(data);
    })
  }

  getuserCount(){
    this.adminData.userCount().subscribe((data: any)=>{
      this.count=data;
      console.log(this.count)
    })
  }

  getsellerCount()
  {
    this.adminData.sellerCount().subscribe((data: any)=>{
      this.scount=data;
      console.log(data);
      console.log(this.scount)
    })
  }


  getadminData(){
    this.adminData.AdminData().subscribe((data: any)=>{
      this.admin=data;
      console.log(this.admin)
    })
  }



  getData(){
    this.adminData.subAdminData().subscribe((data:any)=>{
      this.subadmin=data;
      console.log(this.subadmin)
    })
  }

  getservices(){
    this.adminData.servicesData().subscribe((data:any)=>{
      this.service=data;
      console.log(this.service);
    })
  }


services()
  { this.servicesverify=true;
    this.verify=false;
    this.verified=false;
    this.sellerverify=false;
  }
  superadmin()
  {
    this.verified=true;
  }
  back()
  {
    this.verified=false;
  }
  dashboard()
  {
    this.verify=false;
    this.verified=false;
    this.sellerverify=false;
    this.servicesverify=false;
  }
  getuser()
  {
    this.verify=true;
    this.sellerverify=false;
    this.verified=false;
    this.servicesverify=false;
  }
  getseller(){
    this.sellerverify=true;
    this.verify=false;
    this.verified=false;
    this.servicesverify=false;
  }
  // open(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  // openDialog() {
  //    this.dialog.open(DialogComponent,{

  //      width:'30%'
  //    });
  // }
//   GetDetails(index:any)
//   {
//     console.log(index);
//     this.verified=true;
//     if(index!=null)
//     {
//     this.username=index.username;
//       this.password=index.password;
//       this.role=index.role;
//       this.deleteuser=index.deleteUser;
//       this.createseller=index.createSeller;
//       this.createuser=index.createUser;
//       this.deleteseller=index.deleteSeller;


//     }
//   }

//   closeForm()
//   {
//     this.verified=false;
//   }

//   delete(admin: { username: any; }){

//    let info={
//     username:admin.username
//    }
//    console.log(info);
//    this.subadminData.deleteadmin(info).subscribe((result) => {
//           // console.log(result);
//           if (result.statusCode == 200) {
//             alert("admin deleted succesfully")
//             setTimeout(() => {
//               // this.route.navigate(['/home']);
//               this.getData();
//             }, 2000);
//           } else {
//             // this.toastr.errorToastr(result.data);
//             alert(result.data);
//           }
//         });
// }

// updateForm()
// {
//   let userData = {
//     username: this.username,
//     password: this.password,
//     role: this.role,
//     deleteUser:this.deleteuser,
//     deleteSeller:this.deleteseller,
//     createUser:this.createuser,
//     createSeller:this.createseller,
//   };
//   console.log(userData)
//   this.subadminData.updateadmin(userData).subscribe((result) => {
//     console.log(result);
//     if (result.statusCode == 200) {
//       alert("admin register succesfully")
//       setTimeout(() => {
//         // this.route.navigate(['/home']);
//         this.verified=false;
//         this.getData();
//       }, 100);
//     } else {
//       // this.toastr.errorToastr(result.data);
//       alert(result.data);
//     }
//   });
// }


submitSubadmin()
{
  let userData = {
    username: this.username,
    password: this.password,
    role: this.role,
  };
  console.log(userData)
  this.adminData.submitsubadmin(userData).subscribe((result:any) => {
    console.log(result);
    if (result.statusCode == 200) {
      // alert("subadmin added succesfully")
      this.toastr.successToastr('subadmin added succesfully');
      setTimeout(() => {
        // this.route.navigate(['/home']);
        this.getData();
        // this.verified=true;
      }, 2000);
    } else {
      this.toastr.errorToastr(result.data);
      // alert(result.data);
    }
  });
}


userDelete(user: any)
{
     this.adminData.getuserDelete(user).subscribe((result:any)=>{
      console.log(result);
      if (result.statusCode == 200) {
        // alert("user deleted succesfully")
        this.toastr.successToastr('user deleted succesfully');
        setTimeout(() => {
          // this.route.navigate(['/home']);
          this.getuserData();
          // this.verified=true;
        }, 2000);
      } else {
        this.toastr.errorToastr(result.data);
        // alert(result.data);
      }
     });
}

updatestatus(user: any)
{
  //  console.log(user.active_status);

             if(user.active_status==true)
             {
              user.active_status=1;
             }
             else{
              user.active_status=0;
             }
  let userData={
    userstatus:user.active_status,
    user_id:user.user_id
  }
 this.adminData.getstatusupdate(userData).subscribe((result:any)=>{
  if (result.statusCode == 200) {
    // alert("user updated succesfully")
    this.toastr.successToastr('user updated succesfully');
    setTimeout(() => {
      // this.route.navigate(['/home']);
      this.getsellerData();
      // this.verified=true;
    }, 1000);
  } else {
    this.toastr.errorToastr(result.data);
    // alert(result.data);
  }
 }
 )
}

updatesellerstatus(seller:any)
{
    //  console.log(data.seller_status);
    if(seller.seller_status==true)
             {
              seller.active_status=1;
             }
             else{
              seller.active_status=0;
             }
  let sellerData={
    sellerstatus:seller.active_status,
    seller_id:seller.id_seller
  }

  this.adminData.getsellerstatusupdate(sellerData).subscribe((result:any)=>{
    if (result.statusCode == 200) {
      // alert("seller status updated succesfully")
      this.toastr.successToastr('seller status updated succesfully');
      setTimeout(() => {
        // this.route.navigate(['/home']);
        this.getuserData();
        // this.verified=true;
      }, 2000);
    } else {
      this.toastr.errorToastr(result.data);
      // alert(result.data);
    }
  })


}
updateadminstatus(admin:any)
{
  // console.log(admin)
    //  console.log(data.seller_status);
    if(admin.active_status==true)
             {
              admin.active_status=1;
             }
             else{
              admin.active_status=0;
             }
    if(admin.deleteseller_perm ==true)
    {
      admin.deleteseller_perm=1;
    }
    else{
      admin.deleteseller_perm=0;
    }
    if(admin.createseller_perm==true)
    {
      admin.createseller_perm=1;
    }
    else{
      admin.createseller_perm=0;
    }
  let subadminData={
    subadminstatus:admin.active_status,
    deleteperm:admin.deleteseller_perm,
    createperm:admin.createseller_perm,
    subadmin_id:admin.id_subadmin
  }

  this.adminData.getsubadminstatusupdate(subadminData).subscribe((result:any)=>{
    if (result.statusCode == 200) {
      // alert("subadmin status updated succesfully")
      this.toastr.successToastr('subadmin status updated succesfully');
      setTimeout(() => {
        // this.route.navigate(['/home']);
        this.getData();
        // this.verified=true;
      }, 2000);
    } else {
      this.toastr.errorToastr(result.data);
      // alert(result.data);
    }
  })


}

updateservicesstatus(service: any){
  if(service.active_status==true)
  {
   service.active_status=1;
  }
  else{
   service.active_status=0;
  }
let serviceData={
servicestatus:service.active_status,
service_id:service.id
}

this.adminData.getservicesatusupdate(serviceData).subscribe((result:any)=>{
if (result.statusCode == 200) {
// alert("seller status updated succesfully")
this.toastr.successToastr('services status updated succesfully');
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
}
