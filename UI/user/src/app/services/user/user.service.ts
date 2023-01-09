import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, environment1 } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url: string = environment1.APIEndpoint;
  constructor(private http: HttpClient) { }
  // public get_user() {
  //   return this.http.get(`${this.base_url}/userData`);
  // }

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  // API: POST /user
  userData(): Observable<any> {
    // console.log(this.base_url);
    return this.http.get(this.base_url + "userData", {
      headers: this.reqHeader,
    });
  }
  // API :GET/USER_Id}
  getUser(param): Observable<any>{
    return this.http.post(this.base_url + "user",param,{
      headers: this.reqHeader,
    });
  }
}
