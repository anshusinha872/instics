import { SessionService } from './../../../services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/paymentGateway/payment.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { App } from '@capacitor/app';
import { DatePipe } from '@angular/common';
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
    private paymentService: PaymentService
  ) {}

  public arr = [];
  public selectedListCount: number = 0;
  public cartList = [];
  public totalCheckoutPrice = 0;
  public upiText = '';
  public showUpiField = false;
  public upi_id = '';
  public payment_session_id = '';
  supportedInstruments = [];
  canMakePaymentCache = 'canMakePaymentCache';
  details: any;
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
    this.changeFormat(new Date);
  }
  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  changeFormat(today) {
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = ChangedFormat;
    // return this.changedDate;
    console.log(this.changedDate);
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
  removeItem(item) {
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
  navigate() {
    this.Location.back();
  }
  createPayment() {
    console.log('createPayment');
    const req = {
      user_id: this.sessionService.get('user_id'),
      amount: this.totalCheckoutPrice,
      p_info: 'print',
    };
    let pendingPdfId = [];
    for (let i = 0; i < this.cartList[0].length; i++) {
      pendingPdfId.push(this.cartList[0][i].id);
    }
    console.log(pendingPdfId);
    this.sessionService.set('pendingPdfId', pendingPdfId);
    this.sessionService.set('totalCheckoutPrice', this.totalCheckoutPrice);
    this.sessionService.set('txn_date', this.changedDate);
    this.paymentService.createPayment(req).subscribe((res) => {
      if (res[0].status == true) {
        console.log(res);
        console.log(res[0].data.payment_url);
        this.toastr.successToastr('Payment created');
        this.sessionService.set('client_txn_id', res[1].client_txn_id);
        this.sessionService.set('key', res[1].key);
        window.open(res[0].data.payment_url, '_self');
        // window.location.href = res[0].data.payment_url;
      } else {
        this.toastr.errorToastr(res.msg);
        console.log(res.message);
      }
    });
  }
}
