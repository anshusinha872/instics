import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LaundryService {
  private base_url = environment.APIEndpoint;
  constructor(private http: HttpClient) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  showLaundryClothServices(): Observable<any> {
    return this.http.get(this.base_url + 'laundry/showSection', {
      headers: this.reqHeader,
    });
  }

  getlaundryservicestatus(): Observable<any> {
    return this.http.get(this.base_url + 'laundryservicestatus', {
      headers: this.reqHeader,
    });
  }
  getpaymenthistory(): Observable<any> {
    return this.http.get(this.base_url + 'paymenthistory', {
      headers: this.reqHeader,
    });
  }
  gettotalpayment(): Observable<any> {
    return this.http.get(this.base_url + 'totalpayment', {
      headers: this.reqHeader,
    });
  }

  getlaundrysatusupdate(param: any): Observable<any> {
    console.log(param);
    return this.http.post(this.base_url + 'laundrystatusupdate', param, {
      headers: this.reqHeader,
    });
  }

  getcalculateamount(param: any): Observable<any> {
    console.log(param);
    return this.http.post(this.base_url + 'calculateamount', param, {
      headers: this.reqHeader,
    });
  }
  getcontactamount(param: any): Observable<any> {
    console.log(param);
    return this.http.post(this.base_url + 'contactamount', param, {
      headers: this.reqHeader,
    });
  }

  getreportSuccessData(param: any): Observable<any> {
    console.log(param);
    return this.http.post(this.base_url + 'successamount', param, {
      headers: this.reqHeader,
    });
  }
  getreportFailData(param: any): Observable<any> {
    console.log(param);
    return this.http.post(this.base_url + 'failamount', param, {
      headers: this.reqHeader,
    });
  }
  getreportPendingData(param: any): Observable<any> {
    console.log(param);
    return this.http.post(this.base_url + 'pendingamount', param, {
      headers: this.reqHeader,
    });
  }

  getreportTodayorder(param: any): Observable<any> {
    return this.http.post(this.base_url + 'todayorder', param, {
      headers: this.reqHeader,
    });
  }

  getreporttotalpayment(param: any): Observable<any> {
    return this.http.post(this.base_url + 'reporttotalpayment', param, {
      headers: this.reqHeader,
    });
  }

  createCoupon(param: any): Observable<any> {
    return this.http.post(this.base_url + 'laundry/createCoupon', param, {
      headers: this.reqHeader,
    });
  }
  deleteCoupon(param: any): Observable<any> {
    return this.http.post(this.base_url + 'laundry/deleteCoupon', param, {
      headers: this.reqHeader,
    });
  }
  getAllCoupons(): Observable<any> {
    return this.http.get(this.base_url + 'laundry/getAllCoupons', {
      headers: this.reqHeader,
    });
  }

  createLaundryClothServiceName(param: { name: string }): Observable<any> {
    return this.http.post(this.base_url + 'laundry/addServiceName', param, {
      headers: this.reqHeader,
    });
  }

  addLaundryClothType(param: {
    name: string;
    price: string;
    sectionName: string;
  }): Observable<any> {
    return this.http.post(this.base_url + 'laundry/addClothType', param, {
      headers: this.reqHeader,
    });
  }
  showClothType(): Observable<any> {
    return this.http.get(this.base_url + 'laundry/showAllClothType', {
      headers: this.reqHeader,
    });
  }
  deleteLaundryClothSection(param: { id: any }): Observable<any> {
    return this.http.post(this.base_url + 'laundry/deleteSection', param, {
      headers: this.reqHeader,
    });
  }
  deleteLaundryClothType(param: any): Observable<any> {
    return this.http.post(this.base_url + 'laundry/deleteClothType', param, {
      headers: this.reqHeader,
    });
  }
  placeLaundryOrder(param: any): Observable<any> {
    return this.http.post(this.base_url + 'laundry/placeOrder', param, {
      headers: this.reqHeader,
    });
  }
  getLaundryOrderDetails(param: any): Observable<any> {
    return this.http.post(this.base_url + 'laundry/getOrderDetails', param, {
      headers: this.reqHeader,
    });
  }
  sendMail(param: any): Observable<any> {
    return this.http.post(this.base_url + 'mail', param, {
      headers: this.reqHeader,
    });
  }
}
