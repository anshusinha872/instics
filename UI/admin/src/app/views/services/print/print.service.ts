import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  private base_url = environment.APIEndpoint;
  constructor(
    private http: HttpClient,) { }
    reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

 
    
    getPrintservicestatus():Observable<any>
    {
      return this.http.get(this.base_url + 'print/printservicestatus',{
       headers: this.reqHeader,
     }) 
    }
    // getlaundryservicestatus():Observable<any>
    // {
    //   return this.http.get(this.base_url + 'laundryservicestatus',{
    //    headers: this.reqHeader,
    //  }) 
    // }
    getpaymenthistory():Observable<any>
    {
      return this.http.get(this.base_url + 'print/paymenthistory',{
       headers: this.reqHeader,
     }) 
    }
    gettotalpayment():Observable<any>
    {
      return this.http.get(this.base_url + 'print/totalpayment',{
       headers: this.reqHeader,
     }) 
    }

    getPrintsatusupdate(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'print/printstatusupdate', param, {
       headers: this.reqHeader,
     }) 
    }

    getcalculateamount(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'print/calculateamount', param, {
       headers: this.reqHeader,
     }) 
    }
    getcontactamount(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'print/contactamount', param, {
       headers: this.reqHeader,
     }) 
    }

    getreportSuccessData(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'print/successamount', param, {
       headers: this.reqHeader,
     }) 
    }
    getreportFailData(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'print/failamount', param, {
       headers: this.reqHeader,
     }) 
    }
    getreportPendingData(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'print/pendingamount', param, {
       headers: this.reqHeader,
     }) 
    }
     
    getreportTodayorder(param:any):Observable<any>
    {
      return this.http.post(this.base_url + 'print/todayorder',param,{
       headers: this.reqHeader,
     }) 
    }
    
    getreporttotalpayment(param:any):Observable<any>
    {
      return this.http.post(this.base_url + 'print/reporttotalpayment',param,{
       headers: this.reqHeader,
     }) 
    }

    

  
    
    
    


  }
