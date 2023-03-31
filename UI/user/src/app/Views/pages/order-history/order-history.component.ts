import { Component, OnInit } from '@angular/core';
import { PDF } from './PDF';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LaundryService } from 'src/app/services/laundry/laundry.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  pdfs: PDF[];
  laundryOrderDetails=[];
  list=[];
  showtableindex:number;
  // listList: any = [];
  // item: any = [];
  constructor(
    private pdfService: PdfService,
    private sessionService: SessionService,
    private toastr: ToastrManager,
    private laundryService: LaundryService,
  ) {}

  ngOnInit(): void {
    this.getPdfs();
    this.getLaundryOrderDetails();
  }
  visible: boolean;

    showDialog(data) {
      console.log(data);
      this.showtableindex = data;
      console.log(this.showtableindex);
      console.log("table"+data);
      const id = "table"+data;
      // console.log(document.getElementById("table"+data));
      // document.getElementById('anshu').classList.toggle('d-none');
      this.visible = true;
    }
  getPdfs() {
    const user_id = this.sessionService.get('user_id');
    // console.log('user_id', user_id);
    const req = {
      user_id: user_id,
    }
    this.pdfService.getUserPDF(req).subscribe((data) => {
      // console.log(data);
      if (data.statusCode == 200) {
        this.pdfs = data.data;
        // console.log(this.pdfs);
        this.toastr.successToastr('PDFs fetched successfully');
      }
      else {
        this.pdfs = [];
      }
      // console.log(this.pdfs);
    });
  }
  getLaundryOrderDetails() {
    const user_id = this.sessionService.get('user_id');
    // console.log('user_id', user_id);
    const req = {
      user_id: user_id,
    }
    this.laundryService.getLaundryOrderDetails(req).subscribe((data) => {
      // console.log(data);
      if (data.statusCode == 200) {
        this.laundryOrderDetails = data.data;
       console.log(data.data);
      }
      else {
        console.log('error');
      }
      // console.log(this.pdfs);
    });
  };
  showtable(item){
    document.getElementById(item).classList.toggle('d-none');
  }
}
