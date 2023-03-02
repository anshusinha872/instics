import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private base_url: string = environment.APIEndpoint;
  constructor(
    private sessionService: SessionService,
    private http: HttpClient
  ) {}

  createPayment(param): Observable<any> {
    return this.http.post(this.base_url + 'cart/createOrder', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  checkPaymentStatus(param): Observable<any> {
    return this.http.post(this.base_url + 'cart/checkPaymentStatus', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  getPaymentHistory(param): Observable<any> {
    return this.http.post(this.base_url + 'getPaymentHistory', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
}
