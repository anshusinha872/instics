import { Component, OnInit } from '@angular/core';
import { PDF } from './PDF';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PaymentService } from 'src/app/services/paymentGateway/payment.service';
@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent implements OnInit {
  paymentList:any;
  constructor(
    private pdfService: PdfService,
    private sessionService: SessionService,
    private toastr: ToastrManager,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getPaymentHistory();
  }
  getPaymentHistory() {
    const user_id = this.sessionService.get('user_id');
    // console.log('user_id', user_id);
    const req = {
      user_id: user_id,
    };
    this.paymentService.getPaymentHistory(req).subscribe((data) => {
      // console.log('data', data);
      if (data.statusCode == 200) {
        this.paymentList = data.data;
        // console.log(this.paymentList);
        this.toastr.successToastr('Payment History fetched successfully');
      } else {
        this.paymentList = [];
      }
    });
  }
      
    // this.pdfService.getUserPDF(req).subscribe((data) => {
    //   if (data.statusCode == 200) {
    //     this.pdfs = data.data;
    //     console.log(this.pdfs);
    //     this.toastr.successToastr('PDFs fetched successfully');
    //   } else {
    //     this.pdfs = [];
    //   }
    // });
}
