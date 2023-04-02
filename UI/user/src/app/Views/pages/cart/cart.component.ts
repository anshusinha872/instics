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
  public pdfList = [];
  public laundryListItemPresent:Boolean = false;
  public pdfListItemPresent:Boolean = false;
  public laundryList = [];
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
    let ChangedFormat = this.pipe.transform(this.today, 'dd-MM-YYYY');
    this.changedDate = ChangedFormat;
    // return this.changedDate;
    // console.log(this.changedDate);
  }
  getCartItems() {
    const user_id = this.sessionService.get('user_id');
    const req = {
      user_id: user_id,
    };
    this.cartService.viewCartItem(req).subscribe((res) => {
      if (res.statusCode == 200) {
        this.toastr.successToastr('Item loaded');
        // console.log(res.data);
        this.cartList = res.data;
        console.log(this.cartList.length);
        if(this.cartList.length==0){
          this.toastr.errorToastr('Cart is empty');
        }
        else if(this.cartList.length==1){
          console.log(this.cartList[0][0].orderType=='Laundary');
          if(this.cartList[0][0].orderType=='Laundary'){
            this.laundryList = this.cartList[0];
            this.laundryListItemPresent = true;
            console.log('only laundry is present');
            console.log(this.laundryList);
          }
          else if(this.cartList[0][0].orderType=='Printing'){
            this.pdfList = this.cartList[0];
            this.pdfListItemPresent = true;
            console.log('only printing is present');
            console.log(this.pdfList);
          }
        }
        else{
          this.laundryListItemPresent = true;
          this.pdfListItemPresent = true;
          console.log('both are present');
          this.pdfList = this.cartList[0];
          this.laundryList = this.cartList[1];
          console.log(this.pdfList);
          console.log(this.laundryList);
        }
        for(let i=0;i<this.pdfList[1].length;i++){
          this.totalCheckoutPrice += this.pdfList[1][i].totalCost;
        }
        for(let i=0;i<this.laundryList[1].length;i++){
          console.log(this.laundryList[1][i]);
          if(this.laundryList[1][i].paymentMode=='upi'){
            this.totalCheckoutPrice += this.laundryList[1][i].FinalPrice;
          }
        }
        // this.cartList.push(res.data);
        // this.cartList = res.data;
        // console.log(this.cartList);
        // this.totalCheckoutPrice = 0;
        // for (let i = 0; i < this.cartList.length; i++) {
        //   for(let j=0;j<this.cartList[i].length;j++){
        //     if(j>0){
        //       if(i==0){
        //         console.log('print');
        //       }
        //       else if(i==1){
        //         console.log('laundry');
        //       }
        //       // console.log(j,this.cartList[i][j])
        //       for(let k=0;k<this.cartList[i][j].length;k++){
        //         // console.log('i',i,'j',j,'k',k,this.cartList[i][j][k])
        //         if(i==0){
        //           // console.log(this.cartList[i][j][k].totalCost)
        //           this.totalCheckoutPrice += this.cartList[i][j][k].totalCost;
        //         }
        //         if(i==1){
        //           if(this.cartList[i][j][k].paymentMode=='upi'){
        //             this.totalCheckoutPrice += this.cartList[i][j][k].FinalPrice;
        //           }
        //           else{
        //             this.totalCheckoutPrice += this.cartList[i][j][k].totalAmount;
        //           }
        //           // console.log(this.cartList[i][j][k].FinalPrice)
        //         }
        //       }
        //     }
        //     // this.totalCheckoutPrice += this.cartList[i][j].price;
        //   }
        // }
      } else {
        this.toastr.errorToastr(res.data);
        // console.log(res.message);
      }
    });
  }
  removeItem(itemType,item) {
    const user_id = this.sessionService.get('user_id');
    const req = {
      user_id: user_id,
      item_id: item,
      item_type: itemType,
    };
    console.log(req);
    this.cartService.deleteCartItem(req).subscribe((res) => {
      // console.log(res);
      if (res.statusCode == 200) {
        this.toastr.successToastr('Item deleted');
        this.cartList = [];
        this.totalCheckoutPrice = 0;
        this.laundryListItemPresent = false;
        this.pdfListItemPresent = false;
        this.getCartItems();
      } else {
        this.toastr.errorToastr(res.message);
        // console.log(res.message);
      }
    });
  }
  navigate() {
    this.Location.back();
  }
  createPayment() {
    // console.log('createPayment');
    let pendingPdfId = [];
    for (let i = 0; i < this.cartList[0].length; i++) {
      pendingPdfId.push(this.cartList[0][i].id);
    }
    const req = {
      user_id: this.sessionService.get('user_id'),
      amount: this.totalCheckoutPrice,
      p_info: 'print',
      pdf_id:pendingPdfId,
    };
    // console.log(pendingPdfId);
    this.sessionService.set('pendingPdfId', pendingPdfId);
    this.sessionService.set('totalCheckoutPrice', this.totalCheckoutPrice);
    this.sessionService.set('txn_date', this.changedDate);
    this.paymentService.createPayment(req).subscribe((res) => {
      if (res[0].status == true) {
        // console.log(res);
        // console.log(res[0].data.payment_url);
        this.toastr.successToastr('Payment created');
        this.sessionService.set('client_txn_id', res[1].client_txn_id);
        this.sessionService.set('key', res[1].key);
        window.open(res[0].data.payment_url, '_blank');
        // window.location.href = res[0].data.payment_url;
      } else {
        this.toastr.errorToastr(res.msg);
        // console.log(res.message);
      }
    });
  }
}
