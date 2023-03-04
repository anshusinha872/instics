import { Component, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss'],
})
export class SubAdminComponent {
  subAdminData: any;
  userName: string = '';
  userId: string = '';
  username:string='';
  password: string = '';
  registrationDate: string = '';
  remarks: string = '';
  roleId: string = '';
  navbarfixed: boolean=false;
  subadmin: any;
  seller: any;
 role:any;
 contact:any;
 gst_no:any;
 email_id:any;
 shop:any;
ans:any;
  perm: any;
  buttonDisabled:boolean=false;
 
  token:string=`sessionStorage.getItem('token')`;


 

  constructor(private subadminData:AdminService,
    public route: Router,
    private toastr: ToastrManager,
      ){
    }
    ngOnInit(): void {
      this.sellergetData();
      this.subadmingetPerm();
      this.ans = sessionStorage.getItem('role');
      console.log(this.ans)
     
       }

       sellergetData(){
        let sellerData={
          role:sessionStorage.getItem('role'),
        }
        this.subadminData.sellerData(sellerData).subscribe((data)=>{
          this.seller=data;
          // console.log(this.seller)
        })
      }

      subadmingetPerm()
      {
          let subadminData={
            username:sessionStorage.getItem('username'),
          }
          this.subadminData.getsubadminPerm(subadminData).subscribe((data)=>{
            this.perm=data;
            console.log(this.perm)
          })
      }

      

      readLocalStorageValue(key:any){
        //  console.log(sessionStorage.getItem(key))
        return sessionStorage.getItem(key);
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

    submit() {
      if (
        this.username == '' ||
        this.email_id == '' ||
        this.password == '' ||
        this.contact == ''  ||
        this.gst_no  == ''  ||
        this.shop ==  ''    ||
        this.role ==  ''    
      ) {
        this.toastr.infoToastr('Please fill all the fields');
        return;
      }
      if (this.password.length < 8) {
        this.toastr.infoToastr('Password must be atleast 8 characters');
        return;
      }
      if (this.contact.length != 10) {
        this.toastr.infoToastr('Contact number must be 10 digits');
        return;
      }
     
      let sellerData={
        username:this.username,
        password:this.password,
        role:this.role,
        email_id:this.email_id,
        gst_no:this.gst_no,
        shop:this.shop,
        contact:this.contact
      }

     this.subadminData.addsellerData(sellerData).subscribe((result)=>{
      console.log(result);
      if (result.statusCode == 200) {
        // alert("subadmin added succesfully")
        this.toastr.successToastr('seller added succesfully');

        setTimeout(() => {
          // this.route.navigate(['/home']);
          this.username='';
          this.password='';
          this.role='';
          this.email_id='';
          this.gst_no='';
          this.shop='';
          this.contact='';
          this.sellergetData();
          // this.verified=true;
        }, 1000);
      } else {
        this.toastr.errorToastr(result.data);
        // alert(result.data);
      }
     })
  
    }
    DeleteSeller(seller:any)
    {
      this.subadminData.getsellerDelete(seller).subscribe((result:any)=>{
        console.log(result);
        if (result.statusCode == 200) {
          // alert("seller deleted succesfully")
          this.toastr.successToastr("seller deleted succesfully");
          setTimeout(() => {
            // this.route.navigate(['/home']);
            this.sellergetData();
            // this.verified=true;
          }, 1000);
        } else {
          this.toastr.errorToastr(result.data);
          // alert(result.data);
        }
       });
    }
}
