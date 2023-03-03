import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { PaymentService } from 'src/app/services/paymentGateway/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private paymentService: PaymentService
  ) {}
  payments = [];
  txn_date;
  key;
  client_txn_id;
  pendingPdfId: string = '';
  user_id;
  paymentStatus = false;
  upi_id = '';
  customer_mobile = '';
  upi_txn_id = '';
  amount = '';
  remark = '';
  ngOnInit(): void {
    this.txn_date = this.sessionService.get('txn_date');
    this.key = this.sessionService.get('key');
    this.client_txn_id = this.sessionService.get('client_txn_id');
    this.pendingPdfId = this.sessionService.get('pendingPdfId');
    this.user_id = this.sessionService.get('user_id');
    console.log(this.txn_date, this.key, this.client_txn_id);
    console.log(this.pendingPdfId);
    this.checkPaymentStatus();
  }
  redirectToCart() {
    // this.router.navigate(['dashboard/services']);
    window.open('http://localhost:4200/dashboard/payment', '_blank');
  }

  checkPaymentStatus() {
    const req = {
      txn_date: this.txn_date,
      key: this.key,
      client_txn_id: this.client_txn_id,
      pdf_id: this.pendingPdfId,
      user_id: this.user_id,
    };
    this.paymentService.checkPaymentStatus(req).subscribe((res) => {
      console.log(res);
      if (res.status == 'success') {
        this.paymentStatus = true;
        this.upi_id = res.customer_vpa;
        this.customer_mobile = res.customer_mobile;
        this.upi_txn_id = res.upi_txn_id;
        this.amount = res.amount;
      } else {
        this.paymentStatus = false;
        this.upi_id = res.customer_vpa;
        this.customer_mobile = res.customer_mobile;
        this.upi_txn_id = res.upi_txn_id;
        this.amount = res.amount;
        this.remark = res.remark;
      }
    });
  }
}
