import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private base_url= environment.APIEndpoint;

  constructor(private http: HttpClient) {}
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  loginadmin(param: any): Observable<any> {
    console.log(param);
    return this.http.post<any>(this.base_url + 'adminLogin', param, {
      headers: this.reqHeader,
    });
  }
}
