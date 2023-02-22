import { Param } from './../../../../../../backend/node_modules/@types/har-format/index.d';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private base_url: string = 'http://localhost:3443/api/v1/'; //local/
  // private base_url: string = 'https://instincts.co.in:3443/';
  private base_url: string = environment.APIEndpoint;
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}
  viewCartItem(param): Observable<any> {
    return this.http.post(this.base_url + 'cart/view', param, {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
  createOrder(param): Observable<any> {
    return this.http.post(this.base_url + 'cart/createOrder', param, {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
  orderPay(param): Observable<any> {
    return this.http.post(this.base_url + 'cart/orderPay', param, {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
  handleWebhook(): Observable<any> {
    return this.http.post(this.base_url + 'webHook/cashFree/success', {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
  deleteCartItem(param): Observable<any> {
    return this.http.post(this.base_url + 'cart/delete', param, {
      headers: this.sessionService.setTokenHeaderImage(),
    });
  }
}
