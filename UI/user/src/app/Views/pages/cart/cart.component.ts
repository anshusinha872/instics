import { SessionService } from './../../../services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InstamojoService } from 'src/app/services/paymentGateway/instaMojo/insta-mojo.service';
declare var Instamojo: any; 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private Location: Location,
    private cartService: CartService,
    private sessionService: SessionService,
    private toastr: ToastrManager,
    private instaMojoService: InstamojoService
  ) {}
  public arr = [];
  public selectedListCount: number = 0;
  public cartList = [];
  public totalCheckoutPrice = 0;
  public upiText = '';
  public showUpiField = false;
  public upi_id = '';
  public payment_session_id = '';
  ngOnInit(): void {
    this.showUpiField = true;
    const user_id = this.sessionService.get('user_id');
    const req = {
      user_id: user_id,
    };
    this.cartService.viewCartItem(req).subscribe((res) => {
      if (res.statusCode == 200) {
        this.toastr.successToastr('Item loaded');
        this.cartList.push(res.data);
        console.log(this.cartList);
      } else {
        this.toastr.errorToastr(res.message);
        console.log(res.message);
      }
    });
    this.arr = [
      { serviceName: 'hello1', items: 1, amount: 200 },
      { serviceName: 'hello2', items: 2, amount: 200 },
      {
        serviceName: 'hello3',
        items: 3,
        amount: 200,
      },
      { serviceName: 'Official Printing', items: 1, amount: 200 },
      { serviceName: 'Official Printing', items: 2, amount: 200 },
      {
        serviceName: 'Official Printing',
        items: 3,
        amount: 200,
      },
      { serviceName: 'Official Printing', items: 1, amount: 200 },
      { serviceName: 'Official Printing', items: 2, amount: 200 },
      {
        serviceName: 'Official Printing',
        items: 3,
        amount: 200,
      },
    ];
  }
  selectItem(i) {
    const id = i;
    const item = document.getElementById(id);
    console.log(item);
    // item.classList.toggle("selectedList")
    if (item.classList.contains('selectedList')) {
      item.classList.remove('selectedList');
      this.selectedListCount--;
    } else {
      item.classList.add('selectedList');
      this.selectedListCount++;
    }
  }
  removeItems() {
    var itemsList = [];
    let list = document.getElementsByClassName('selectedList');
    console.log(list.length);
    for (let i = 0; i < this.selectedListCount; i++) {
      let index = parseInt(list[i].id);
      itemsList.push(index);
    }
    console.log(itemsList);
    // for(let i=0;i<itemsList.length;i++){
    //   this.arr.splice(itemsList[i],1);
    //   console.log(this.arr);
    // }
    this.selectedListCount = 0;
  }
  generateAccessToken() {
    const user_id = this.sessionService.get('user_id');
    let req = {
      user_id: user_id,
    };
    this.cartService.createOrder(req).subscribe((res) => {
      if (res.order_status == 'ACTIVE') {
        this.toastr.successToastr('Order created');
        this.showUpiField = true;
        this.payment_session_id = res.payment_session_id;
        console.log(res.payment_session_id);
        // this.createPaymentRequest();
      }
    });
  }
  createPaymentRequest() {
    const req = {
      payment_session_id: this.payment_session_id,
      upi_id: this.upi_id,
    };
    this.cartService.orderPay(req).subscribe((res) => {
      console.log(res);
    });
  }
  navigate() {
    this.Location.back();
  }
}
