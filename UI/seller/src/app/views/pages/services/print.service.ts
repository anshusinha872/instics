import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PrintService {
  // private base_url: string = 'https://instincts.co.in/api/v1/'; //server/
  private base_url: string = 'http://localhost:3443/api/v1/'; //local
  // private base_url: string = 'https://instincts.co.in:3443/';
  constructor(private http: HttpClient) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  printseller(): Observable<any> {
    return this.http.get(this.base_url + 'pdfList', {
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
}
