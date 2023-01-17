import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private base_url: string = 'http://64.227.130.179:3443/';
  // private base_url: string = 'http://localhost:3443/';
  private base_url: string = environment.APIEndpoint;
  // private base_url: string = environment.APIEndpoint;
  constructor(private http: HttpClient) {}

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  // API: POST /user
  userData(): Observable<any> {
    // console.log(this.base_url);
    return this.http.get(this.base_url + 'userData', {
      headers: this.reqHeader,
    });
  }
  // API :GET/USER_Id}
  // getUser(param): Observable<any> {
  //   return this.http.post(this.base_url + 'user', param, {
  //     headers: this.reqHeader,
  //   });
  // }
  // API: POST /user
  submitUser(param): Observable<any> {
    return this.http.post(this.base_url + 'signup', param, {
      headers: this.reqHeader,
    });
  }
}
