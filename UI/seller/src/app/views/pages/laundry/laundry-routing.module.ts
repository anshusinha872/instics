import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaundryComponent } from './laundry.component';

const routes: Routes = [
  {
    path:'',
    component:LaundryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaundryRoutingModule { }
