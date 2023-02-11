import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private base_url: string = 'https://instincts.co.in/api/v1/'; //local
  // private base_url: string = 'https://instincts.co.in:3443/';
  constructor(private http: HttpClient) {}

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  loginUser(param): Observable<any> {
    return this.http.post<any>(this.base_url + 'login', param, {
      headers: this.reqHeader,
    });
  }
  checkUser(param): Observable<any> {
    console.log(param);
    return this.http.post(this.base_url + 'checkUser', param, {
      headers: this.reqHeader,
    });
  }
  updatePassword(param): Observable<any> {
    return this.http.post(this.base_url + 'updatePassword', param, {
      headers: this.reqHeader,
    });
  }
  logout() {
    sessionStorage.clear();
    return this.http.get(this.base_url + 'logout', {
      headers: this.reqHeader,
    });
  }
}
