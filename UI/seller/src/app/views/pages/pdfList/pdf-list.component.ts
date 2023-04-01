import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrintService } from '../../../service/pdfService/print.service';
import { PDF } from './PDF';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-pdf-list',
  templateUrl: './pdf-list.component.html',
  styleUrls: ['./pdf-list.component.scss'],
})
export class PdfListComponent implements OnInit, OnDestroy {
  pdfs: PDF[];
  print: any;
  count: number = 0;
  sellerId: any;
  getPdfList: boolean = false;
  verify1: boolean = false;
  verify2: boolean = false;
  verify3: boolean = false;
  private stopTimer$ = new Subject<void>();
  constructor(private printdata: PrintService, private toastr:ToastrManager) {}

  // ngOnInit(): void {
  //   this.getPdfList = true;
  //   interval(5000).subscribe(() => {
  //     this.fetchdata();
  //   });
  //   // this.fetchdata();
  // }
  ngOnInit() {
    this.sellerId= sessionStorage.getItem('sellerId');
    interval(5000)
      .pipe(takeUntil(this.stopTimer$))
      .subscribe(() => {
        this.fetchdata();
      });
  }
  fetchdata() {
    const req= {
      sellerId:this.sellerId,
      completion: sessionStorage.getItem('completion'),
      startDate: sessionStorage.getItem('dateStart'),
      endDate:sessionStorage.getItem('endDate')
    }
    this.printdata.printseller(req).subscribe((data) => {
      console.log(data.data);
      this.pdfs = data.data;
      // if(data.statusCode!=200)
      // {
      //   this.toastr.errorToastr('No data available');
      // }
      this.print = data.data;
      this.count += 1;
    });
  }
//  dateFunc(date)
//  {
//   console.log(date);
//   this.date1 = new Date(date);
//   console.log(this.date1);
//  }
  // getdata() {
  //   setInterval(() => {
  //     this.printdata.printseller().subscribe((data) => {
  //       console.log(data.data);
  //       this.pdfs = data.data;
  //       this.print = data.data;
  //     });
  //   }, 5000);
  // }

  pdfSrc = '';
  async renderPdf(pdf) {
    this.printdata.getPdf(pdf).subscribe((data) => {
      const byteArray = new Uint8Array(
        atob(data)
          .split('')
          .map((char) => char.charCodeAt(0))
      );
      const file = new Blob([byteArray], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfSrc = fileURL;
      window.open(fileURL);
    });
  }
  downloadPdf(pdf) {
    this.printdata.getPdf(pdf).subscribe((data) => {
      let pdfName = pdf.user_id + '_' + pdf.pdfName;
      this.downloadFile(data, pdfName);
    });
  }
  downloadFile(base64: any, fileName: any) {
    const src = `data:text/csv;base64,${base64}`;
    const link = document.createElement('a');
    link.href = src;
    link.download = fileName;
    link.click();
    link.remove();
  }

  updatedocstatus(docstatus: any, id: any) {
    let info = {
      docstatus: docstatus,
      id: id,
    };
    console.log(info);
    this.printdata.docstatusupdate(info).subscribe((result) => {
      console.log(result);
      if (result.statusCode == 200) {
        alert('docStatus updated succesfully');
      } else {
        // this.toastr.errorToastr(result.data);
        alert(result.data);
      }
    });
  }
  ngOnDestroy() {
    this.stopTimer$.next();
    this.stopTimer$.complete();
  }
}
