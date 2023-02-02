import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {
  constructor() {}
  public pageRange;
  public customRangePrint = false;
  public colorMode = 1;
  public pdfFile;
  ngOnInit(): void {
    const select_menu = document.getElementById('select-menu');
    const select_btn = document.getElementById('select-btn');
    const select_list = document.getElementById('select-list');
    const selectBtnText = document.getElementsByClassName('selectBtnText');
    const options = document.querySelectorAll('.option');
    const select_item = document.querySelectorAll('.select-item');
    // console.log(options);
    // console.log(selectBtnText[0].innerHTML);
    select_btn.addEventListener('click', () => {
      select_list.classList.toggle('active');
      // console.log(select_list.classList);
      const icon = document.getElementsByClassName('btn-icon');
      if (select_list.classList.contains('active')) {
        icon[0].classList.remove('fa-chevron-down');
        icon[0].classList.add('fa-chevron-up');
      } else {
        icon[0].classList.remove('fa-chevron-up');
        icon[0].classList.add('fa-chevron-down');
      }
    });
    options.forEach((option) => {
      option.addEventListener('click', () => {
        // console.log(option.innerHTML);
        const selectedText = option.innerHTML;
        selectBtnText[0].innerHTML = selectedText;
        select_list.classList.remove('active');
        const icon = document.getElementsByClassName('btn-icon');
        icon[0].classList.remove('fa-chevron-up');
        icon[0].classList.add('fa-chevron-down');
      });
    });
  }
  changePrintRange(event) {
    event == 2
      ? (this.customRangePrint = true)
      : (this.customRangePrint = false);
  }
  changeColorMode(event) {
    console.log(event);
  }
  handleInputPdfFile(event) {
    this.pdfFile = event.target.files[0];
    console.log(this.pdfFile);
    // var reader = new FileReader();
    // reader.readAsBinaryString(this.pdfFile);
    // reader.onloadend = function () {
    //   var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
    //   console.log('Number of Pages:', count);
    // };
    // // console.log(this.pdfFile);
    // var fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   // console.log(fileReader.result);
    //   var typedarray = new Uint8Array(fileReader.result as ArrayBuffer);
    //   const pdfjsLib = window['pdfjs-dist/build/pdf'];
    //   pdfjsLib.GlobalWorkerOptions.workerSrc =
    //     'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js';
    //   pdfjsLib.getDocument(typedarray).promise.then((pdf) => {
    //     console.log(pdf);
    //   });
    // }
    // fileReader.readAsArrayBuffer(this.pdfFile);
  }
  addToCart() {
    console.log('add to cart');
  }
  // async getPageCount(formUrl: any): Promise<number> {
  //   const LogPdfFields = [] as any[];
  //   const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
  //   const pdfDoc = await PDFDocument.load(formPdfBytes);
  //   const pageCount = pdfDoc.getPageCount();
  //   return pageCount;
  // }
}
