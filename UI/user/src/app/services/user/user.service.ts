import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url: string = 'http://localhost:3443/'; //local/
  // private base_url: string = 'https://instincts.co.in:3443/';
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}
  userData(): Observable<any> {
    return this.http.get(this.base_url + 'userData', {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  submitUser(param): Observable<any> {
    return this.http.post(this.base_url + 'signup', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  getUserDetails(param): Observable<any> {
    return this.http.post(this.base_url + 'user', param, {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
  uploadImage(param): Observable<any> {
    return this.http.post<any>(this.base_url + 'img/upload', param, {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
  showImage(): Observable<any> {
    return this.http.get<any>(this.base_url + 'img/show', {
      headers: this.sessionService.setTokenHeader(),
    });
  }
}
