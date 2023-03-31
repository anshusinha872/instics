import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {

  private base_url: string = environment.APIEndpoint;
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}
  createLaundryClothServiceName(param): Observable<any> {
    return this.http.post(this.base_url + 'laundry/addServiceName', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  showLaundryClothServices():Observable<any>{
    return this.http.get(this.base_url+'laundry/showSection',{
      headers:this.sessionService.setTokenHeader(),
    })
  }
  addLaundryClothType(param): Observable<any> {
    return this.http.post(this.base_url + 'laundry/addClothType', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  showClothType():Observable<any>{
    return this.http.get(this.base_url+'laundry/showAllClothType',{
      headers:this.sessionService.setTokenHeader(),
    })
  }
  deleteLaundryClothSection(param):Observable<any>{
    return this.http.post(this.base_url+'laundry/deleteSection',param,{
      headers:this.sessionService.setTokenHeader(),
    })
  }
  deleteLaundryClothType(param):Observable<any>{
    return this.http.post(this.base_url+'laundry/deleteClothType',param,{
      headers:this.sessionService.setTokenHeader(),
    })
  }
  placeLaundryOrder(param): Observable<any> {
    return this.http.post(this.base_url + 'laundry/placeOrder', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  getLaundryOrderDetails(param): Observable<any> {
    return this.http.post(this.base_url + 'laundry/getOrderDetails', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
}
