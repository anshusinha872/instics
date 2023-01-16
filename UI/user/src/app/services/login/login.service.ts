import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private base_url: string = environment.APIEndpoint;
  private base_url: string = 'http://64.227.130.179:3443/';
  // private base_url: string = 'http://localhost:3443/';

  constructor(private http: HttpClient) {}

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  loginUser(param): Observable<any> {
    return this.http.post(this.base_url + 'login', param, {
      headers: this.reqHeader,
    });
  }
}
