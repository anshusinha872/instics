import { Component, OnInit } from '@angular/core';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-printseller',
  templateUrl: './printseller.component.html',
  styleUrls: ['./printseller.component.scss']
})
export class PrintsellerComponent implements OnInit {
  print: any;
  verify1:boolean=false;
  verify2:boolean=false;
  verify3:boolean=false;
  constructor(private printdata:PrintService) { }

  ngOnInit(): void {
    this.getdata();
  }
 
  fetchdata()
  {
    this.printdata.printseller().subscribe((data)=>{
      console.log(data.data);
      
      this.print=data.data;
      
    })
  }
  getdata()
  {
    setInterval(() => {
      // console.log("hello");
      this.printdata.printseller().subscribe((data)=>{
        console.log(data.data);
        
        this.print=data.data;
      })
    }, 5000);
    // this.printdata.printseller().subscribe((data)=>{
    //   console.log(data.data);
      
    //   this.print=data.data;
      
    // })
  }



  pdfSrc = "";

  printPdf(admin: any) {
    // let json: any =  { "type":"Buffer", "data":this.blob }
    // let bufferOriginal = Buffer.from(json.data);

  
    const byteArray = new Uint8Array(
      atob(admin.pdf)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    this.pdfSrc = fileURL;
    window.open(fileURL);
  }

  downloadPdf(admin:any) {
    const byteArray = new Uint8Array(
      atob(admin.pdf)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    // console.log(byteArray);
    const file = new Blob([byteArray], { type: "application/pdf" });
    // console.log(file);
    const fileURL = URL.createObjectURL(file);
    console.log(fileURL);
    let pdfName = admin.user_id+'_'+admin.pdfName;
    this.downloadFile(admin.pdf,pdfName);
    // console.log(pdfName);
    // if (window.navigator && window.navigator) {
    //   window.navigator.msSaveOrOpenBlob(file, pdfName);
    // } else {
      //window.open(fileURL);

    //   // Construct the 'a' element
      // let link = document.createElement("a");
      // link.download = pdfName;
      // link.click();
      // link.target = "_blank";

    //   // Construct the URI
    //   link.href = fileURL;
    //   document.body.appendChild(link);
    //   link.click();

    //   // Cleanup the DOM
    //   document.body.removeChild(link);
    // }
  }
  downloadFile(base64:any,fileName:any){
    const src = `data:text/csv;base64,${base64}`;
    const link = document.createElement("a")
    link.href = src
    link.download = fileName
    link.click()
    
    link.remove()
    }


    updatedocstatus(docstatus: any,id: any)
    {
      let info={
        docstatus:docstatus,
        id:id,
       }
       console.log(info);
       this.printdata.docstatusupdate(info).subscribe((result) => {
        console.log(result);
        if (result.statusCode == 200) {
          alert("docStatus updated succesfully")
          setTimeout(() => {
            // this.route.navigate(['/home']);
            this.getdata();
          }, 100);
        } else {
          // this.toastr.errorToastr(result.data);
          alert(result.data);
        }
      });

    }

    

    


}

