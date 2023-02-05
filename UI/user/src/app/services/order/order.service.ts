import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private base_url: string = 'http://localhost:3443/'; //local/
  // private base_url: string = 'https://instincts.co.in:3443/';
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}
  getOrderHistory(param): Observable<any> {
    return this.http.post(this.base_url + 'order/history', param, {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
}
