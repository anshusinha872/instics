import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private base_url: string = environment.APIEndpoint;
  private base_url: string = 'http://localhost:3443/'; //local
  // private base_url: string = 'https://instincts.co.in:3443/';
  // private base_url: string = environment.APIEndpoint;

  constructor(private http: HttpClient) {}

  reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  loginUser(param): Observable<any> {
    return this.http.post(this.base_url + 'login', param, {
      headers: this.reqHeader,
    });
  }
  uploadImage(param): Observable<any> {
    return this.http.post<any>(this.base_url + 'img/upload', param, {
      headers: this.reqHeader,
    });
  }
  showImage(): Observable<any> {
    return this.http.get<any>(this.base_url + 'img/show', {
      headers: this.reqHeader,
    });
  }
}
