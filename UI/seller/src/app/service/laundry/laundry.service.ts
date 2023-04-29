import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {

  base_url = environment.APIEndpoint;
  constructor(private http: HttpClient) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  getLaundryOrderDetails(param): Observable<any> {
    return this.http.post(this.base_url + 'laundryseller/OrderDetails', param, {
      headers: this.reqHeader,
    });
  }
  updateStatus(param): Observable<any> {
    return this.http.post(this.base_url + 'laundryseller/updateStatus', param, {
      headers: this.reqHeader,
    });
  }
}
