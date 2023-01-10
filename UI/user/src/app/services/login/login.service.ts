import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, environment1 } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private base_url: string = environment1.APIEndpoint;
  constructor(private http: HttpClient) {}

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  loginUser(param): Observable<any> {
    return this.http.post(this.base_url + '/login', param, {
      headers: this.reqHeader,
    });
  }
}
