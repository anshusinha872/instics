import { SessionService } from './../../../services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { App } from '@capacitor/app';
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
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
    this.showUpiField = true;
    this.getCartItems();
    
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
  getCartItems() {
    const user_id = this.sessionService.get('user_id');
    const req = {
      user_id: user_id,
    };
    this.cartService.viewCartItem(req).subscribe((res) => {
      if (res.statusCode == 200) {
        this.toastr.successToastr('Item loaded');
        this.cartList.push(res.data);
        for (let i = 0; i < this.cartList[0].length; i++) {
          this.totalCheckoutPrice += this.cartList[0][i].totalCost;
        }
        console.log(this.cartList);
      } else {
        this.toastr.errorToastr(res.message);
        console.log(res.message);
      }
    });
  }
  // selectItem(i) {
  //   const id = i;
  //   const item = document.getElementById(id);
  //   console.log(item);
  //   // item.classList.toggle("selectedList")
  //   if (item.classList.contains('selectedList')) {
  //     item.classList.remove('selectedList');
  //     this.selectedListCount--;
  //   } else {
  //     item.classList.add('selectedList');
  //     this.selectedListCount++;
  //   }
  // }
  removeItem(item) {
    // console.log('remove item',item);
    const user_id = this.sessionService.get('user_id');
    const req = {
      user_id: user_id,
      item_id: item,
    };
    this.cartService.deleteCartItem(req).subscribe((res) => {
      console.log(res);
      if (res.statusCode == 200) {
        this.toastr.successToastr('Item deleted');
        this.cartList = [];
        this.totalCheckoutPrice = 0;
        this.getCartItems();
      } else {
        this.toastr.errorToastr(res.message);
        console.log(res.message);
      }
    });
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
  handleWebhook() {
    this.cartService.handleWebhook().subscribe((res) => {
      console.log(res);
    });
  }
  navigate() {
    this.Location.back();
  }
}
