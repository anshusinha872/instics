import { PdfService } from './../../../services/pdf/pdf.service';
import { Component, OnInit } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionService } from 'src/app/services/session/session.service';
import { base64 } from '@firebase/util';
import { App } from '@capacitor/app';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {
[x: string]: any;

  documentOption: any[];
  sellers: any[];
  selectedDocumentType = 1;
  public rangeValues: number[] = [1, 1];
  public items: any[];
  public printRange = [];
  public totalPage: number = 0;
  public sellerId: number =0;
  progress = 0;
  showProgress = false;
  private stopTimer$ = new Subject<void>();
  constructor(
    public toastr: ToastrManager,
    public sessionService: SessionService,
    private PdfService: PdfService
   
  ) {
    this.documentOption = [
      {
        label: 'Standard',
        value: 1,
      },
      {
        label: 'Official',
        value: 2,
      },
    ];
  
  }
  pageCount: number = 0;
  public printPricing = [];
  public pageRange;
  public customRangePrint = false;
  public colorMode = 1;
  public pdfFile;
  public totalCost = 0;
  public rangeList = [];
  public noSeller: boolean = true;
  ngOnInit(): void {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
    interval(5000)
      .pipe(takeUntil(this.stopTimer$))
      .subscribe(() => {
       this.fetchSellerData();
      });
    pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';
    
    this.printPricing = [
      [
        {
          id: 1,
          name: 'Black & White',
          price: 2.0,
          description: 'Print in black and white',
        },
        {
          id: 2,
          name: 'Color',
          price: 6.0,
          description: 'Print in color',
        },
        {
          id: 3,
          name: 'Photo Paper',
          price: 10.0,
          description: 'Print on photo paper',
        },
      ],
      [
        {
          id: 1,
          name: 'Black & White',
          price: 5.0,
          description: 'Print in black and white',
        },
        {
          id: 2,
          name: 'Color',
          price: 10.0,
          description: 'Print in color',
        },
        {
          id: 3,
          name: 'Premium Quality',
          price: 15.0,
          description: 'Print on photo paper',
        },
      ],
    ];
  }
  changePrintRange(event) {
    event == 2
      ? (this.customRangePrint = true)
      : (this.customRangePrint = false);
  }
  changeColorMode(event) {
    // console.log(event);
  }
  changeDocType(event) {
    this.selectedDocumentType = event;
    // console.log(this.selectedDocumentType);
  }
  handleInputPdfFile(event) {
    this.pdfFile = event.target.files[0];
    // console.log(this.pdfFile);
  }
  addToCart() {
    if (this.pdfFile == null) {
      this.toastr.errorToastr('Please select a pdf file', 'Error');
      return;
    }
    if (this.rangeList.length == 0) {
      this.toastr.errorToastr('Please select a range', 'Error');
      return;
    }
    if (this.noSeller == true) {
      this.toastr.errorToastr('Please select a seller', 'Error');
      return;
    }
    
    const printData = {
      user_id: sessionStorage.getItem('user_id'),
      pdfFile: this.pdfFile,
      selectedDocumentType: this.selectedDocumentType,
      colorMode: this.colorMode,
      range: this.rangeList,
      totalPage: this.totalPage,
      sellerId: this.sellerId,
      totalCost:
        this.totalPage *
        this.printPricing[this.selectedDocumentType - 1][this.colorMode - 1]
          .price,
    };
    let req = new FormData();
    req.append('user_id', sessionStorage.getItem('user_id'));
    req.append('pdfFile', this.pdfFile);
    req.append('selectedDocumentType', this.selectedDocumentType.toString());
    req.append('colorMode', this.colorMode.toString());
    req.append('range', JSON.stringify(this.rangeList));
    req.append('totalPage', this.totalPage.toString());
    req.append('sellerId', this.sellerId.toString());
    req.append(
      'totalCost',
      (
        this.totalPage *
        this.printPricing[this.selectedDocumentType - 1][this.colorMode - 1]
          .price
      ).toString()
    );

    // console.log(printData);
    // this.PdfService.uploadPdf(req).subscribe((res) => {
    //   if (res.statusCode == 200) {
    //     this.toastr.successToastr(res.message, res.data);
    //     this.printRange = [1, this.pageCount];
    //     this.rangeValues = [1, this.pageCount];
    //     this.rangeList = [];
    //     this.totalPage = 0;
    //     this.pageCount=0;
    //   } else {
    //     this.toastr.errorToastr(res.message, res.data);
    //   }
    // });
    this.PdfService.uploadPdf(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.showProgress = true;
          this.progress = Math.round((100 * event.loaded) / event.total);
          break;
        case HttpEventType.Response:
          if (event.status == 200) {
            this.toastr.successToastr(event.body.message, event.body.data);
            this.printRange = [1, this.pageCount];
            this.rangeValues = [1, this.pageCount];
            this.rangeList = [];
            this.totalPage = 0;
            this.pageCount = 0;
            this.progress = 0;
            this.sellerId = this.sellerId;

            // this.pdfFile = null;
          } else {
            // this.toastr.errorToastr(res.message, res.data);
            this.toastr.errorToastr(event.body.message, event.body.data);
          }
      }
    });
  }
  onFileChange(event) {
    this.showProgress = false;
    this.progress = 0;
    const file = event.target.files[0];
    this.pdfFile = file;
    console.log(this.pdfFile);
    if (this.pdfFile.type != 'application/pdf') {
      this.toastr.errorToastr('Please select a pdf file', 'Error');
      return;
    }
    if (this.pdfFile.size > 2000000) {
      this.toastr.errorToastr('File size should be less than 2MB', 'Error');
      return;
    }
    const fileReader = new FileReader();
    
    fileReader.onload = (e) => {
      const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
      pdfjs.getDocument(typedArray).promise.then((pdf) => {
        this.pageCount = pdf.numPages;
        // console.log(this.pageCount);
        this.printRange = [1, this.pageCount];
        this.rangeValues = [1, this.pageCount];
        this.rangeList = [];
        this.totalPage = 0;
      });
    };

    fileReader.readAsArrayBuffer(file);
  }
  addRange() {
    this.rangeList.push(this.rangeValues);
    // console.log(this.range);
    this.rangeValues = [1, this.pageCount];
    this.totalPage = 0;
    this.rangeList.forEach((element) => {
      this.totalPage = this.totalPage + (element[1] - element[0] + 1);
    });
  }
  removeRange(index) {
    this.rangeList.splice(index, 1);
    // console.log(this.range);
    this.totalPage = 0;
    this.rangeList.forEach((element) => {
      this.totalPage = this.totalPage + (element[1] - element[0] + 1);
    });
  }

  SelectItem(sellerName: any)
  {
    console.log("Seller name is " + sellerName.value );
    this.noSeller = false;
    this.items.forEach(element => {
      if(sellerName.value==element.name)
      {
        this.sellerId= element.id;
      }
    });
    console.log(this.sellerId);

  }
  fetchSellerData()
  {
    this.PdfService.getSellerList().subscribe((data)=>{
      this.sellers = data.data;
      console.log("sellers ");
      console.log(data.data);
    });

  }
  
 
}
