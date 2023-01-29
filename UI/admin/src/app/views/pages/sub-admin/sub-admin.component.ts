import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss'],
})
export class SubAdminComponent {
  subAdminData: any;
  userName: string = '';
  userId: string = '';
  password: string = '';
  registrationDate: string = '';
  remarks: string = '';
  roleId: string = '';
  constructor() {}

  ngOnInit(): void {
    
   }
  submit() {
    console.log('submit');
    console.log(this.userName);
    console.log(this.userId);
    console.log(this.password);
    console.log(this.registrationDate);
    console.log(this.remarks);
    console.log(this.roleId);

  }
}
