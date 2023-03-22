import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PrintService {
  base_url = environment.APIEndpoint;
  constructor(private http: HttpClient) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  printseller(param): Observable<any> {
    return this.http.post(this.base_url + 'pdfListseller',param,{
      headers: this.reqHeader,
    });
  }

  docstatusupdate(param: { docstatus: any }): Observable<any> {
    return this.http.post(this.base_url + 'docstatusupdate', param, {
      headers: this.reqHeader,
    });
  }
  getPdf(param): Observable<any> {
    return this.http.post(this.base_url + 'getPdf', param, {
      headers: this.reqHeader,
    });
  }
  loginseller(param: any): Observable<any> {
    // console.log(param);
    return this.http.post<any>(this.base_url + 'loginseller', param, {
      headers: this.reqHeader,
    });
  }
  
}
