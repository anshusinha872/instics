import { Component, OnInit } from '@angular/core';
import { PDF } from './PDF';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  pdfs: PDF[];
  constructor(
    private pdfService: PdfService,
    private sessionService: SessionService,
    private toastr: ToastrManager
  ) {}

  ngOnInit(): void {
    this.getPdfs();
  }
  getPdfs() {
    const user_id = this.sessionService.get('user_id');
    console.log('user_id', user_id);
    const req = {
      user_id: user_id,
    }
    this.pdfService.getUserPDF(req).subscribe((data) => {
      // console.log(data);
      if (data.statusCode == 200) {
        this.pdfs = data.data;
        console.log(this.pdfs);
        this.toastr.successToastr('PDFs fetched successfully');
      }
      else {
        this.pdfs = [];
      }
      // console.log(this.pdfs);
    });
  }
  
}
