import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LaundryService } from 'src/app/service/laundry/laundry.service';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.scss']
})
export class LaundryComponent implements OnInit {
  laundryOrderDetails: any;
  list = [];
  showtableindex: number;
  constructor(private laundryService: LaundryService, private toastr: ToastrManager) { }

  ngOnInit(): void {
    this.getLaundryOrderDetails();
  }
  openMap(){
    console.log('btn clicked');
  }
  openGoogleMaps(latitude, longitude) {
    console.log(latitude, longitude);
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  }
  getLaundryOrderDetails() {
    // console.log('user_id', user_id);
    const req = {

      completion: sessionStorage.getItem('completion'),
      startDate: sessionStorage.getItem('dateStart'),
      endDate: sessionStorage.getItem('endDate')
    }
    this.laundryService.getLaundryOrderDetails(req).subscribe((data) => {
      // console.log(data.data.laundryOrderDetails[0][0]);
      if (data.statusCode == 200) {
        this.laundryOrderDetails = data.data;
        console.log(this.laundryOrderDetails);
      }
      else {
        console.log('error');
      }
      // console.log(this.pdfs);
    });
  };

  visible: boolean;

  showDialog(data) {
    // console.log(data);
    this.showtableindex = data;
    // console.log(this.showtableindex);
    // console.log("table"+data);
    const id = "table" + data;
    // console.log(document.getElementById("table"+data));
    // document.getElementById('anshu').classList.toggle('d-none');
    this.visible = true;
  }


}
