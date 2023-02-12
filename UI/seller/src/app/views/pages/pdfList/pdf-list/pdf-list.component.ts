import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../services/print.service';
import { PDF } from '../PDF';
@Component({
  selector: 'app-pdf-list',
  templateUrl: './pdf-list.component.html',
  styleUrls: ['./pdf-list.component.scss'],
})
export class PdfListComponent implements OnInit {
  pdfs: PDF[];
  print: any;
  verify1: boolean = false;
  verify2: boolean = false;
  verify3: boolean = false;
  constructor(private printdata: PrintService) {}

  ngOnInit(): void {
    this.fetchdata();
  }
  fetchdata() {
    setInterval(() => {
      this.printdata.printseller().subscribe((data) => {
        console.log(data.data);
        this.pdfs = data.data;
        this.print = data.data;
      });
    }, 5000);
  }

  getdata() {
    setInterval(() => {
      this.printdata.printseller().subscribe((data) => {
        console.log(data.data);
        this.pdfs = data.data;
        this.print = data.data;
      });
    }, 5000);
  }

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
}
