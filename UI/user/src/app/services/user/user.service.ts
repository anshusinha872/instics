import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, environment1 } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url: string = environment1.APIEndpoint;
  constructor(private http: HttpClient) {}
  public get_user() {
    return this.http.get(`${this.base_url}/user`);
  }

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  // API: POST /user
  singupUser(userData): Observable<any> {
    return this.http.post(`${this.base_url}/user`, userData, {
      headers: this.reqHeader,
    });
  }
}
