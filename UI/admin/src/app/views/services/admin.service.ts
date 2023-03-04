import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../services/session/session.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private base_url = environment.APIEndpoint;
  
  // private base_url: string = 'https://instincts.co.in/api/v1/';
  constructor(
    private http: HttpClient,) { }
    reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    
    userCount(): Observable<any> {
      return this.http.get(this.base_url + 'countUser',{
      headers: this.reqHeader,
    });
    }
    sellerCount(): Observable<any> {
      return this.http.get(this.base_url + 'countSeller',{
        headers: this.reqHeader,
    });
    }


    AdminData(): Observable<any> {
      return this.http.get(this.base_url + 'AdminData',{
      headers: this.reqHeader,
    });
    }
    servicesData(): Observable<any> {
      return this.http.get(this.base_url + 'services',{
      headers: this.reqHeader,
    });
    }
    userData(): Observable<any> {
      return this.http.get(this.base_url + 'getuserData',{
      headers: this.reqHeader,
    });
    }
    subAdminData(): Observable<any> {
      return this.http.get(this.base_url + 'subAdminData',{
      headers: this.reqHeader,
    });
    }

    // loginadmin(param:any): Observable<any> {
    //   console.log(param)
    //   return this.http.post<any>(this.base_url + 'adminLogin', param, {
    //     headers: this.reqHeader,
    //   });
    // }

    submitsubadmin(param: { username: string; password: string; role: string; }): Observable<any> {
      return this.http.post(this.base_url + 'registersubadmin', param, {
        headers: this.reqHeader,
      });
    }
    
    deleteadmin(param: any):Observable<any> 
     {
      console.log(param);
      return this.http.post(this.base_url + 'deleteadmin', param, {
        headers: this.reqHeader,
      });
    }

    updateadmin(param: { username: string; password: string; role: string; deleteUser: string; deleteSeller: string; createUser: string; createSeller: string; }):Observable<any> 
    {
      return this.http.post(this.base_url + 'updateadmin', param, {
        headers: this.reqHeader,
      });
    }

    sellerData(param:any):Observable<any> 
    {
      console.log(param)
     return this.http.post(this.base_url + 'sellerdata', param, {
      headers: this.reqHeader,
    }) 
    }

    getuserDelete(param:any):Observable<any> 
    {
      console.log(param)
     return this.http.post(this.base_url + 'deleteuserData', param, {
      headers: this.reqHeader,
    }) 
    }
    getsellerDelete(param:any):Observable<any> 
    {
      console.log(param)
     return this.http.post(this.base_url + 'deletesellerData', param, {
      headers: this.reqHeader,
    }) 
    }

    getstatusupdate(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'userstatusupdate', param, {
       headers: this.reqHeader,
     }) 
    }
    getservicesatusupdate(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'servicestatusupdate', param, {
       headers: this.reqHeader,
     }) 
    }
    getsellerstatusupdate(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'sellerstatusupdate', param, {
       headers: this.reqHeader,
     }) 
    }
    getsubadminstatusupdate(param:any):Observable<any>
    {
      console.log(param)
      return this.http.post(this.base_url + 'subadminstatusupdate', param, {
       headers: this.reqHeader,
     }) 
    }

    allsellerData(): Observable<any> {
      return this.http.get(this.base_url + 'getsellerData',{
      headers: this.reqHeader,
    });
    }

    getsubadminPerm(param:any):Observable<any> {
      console.log(param);
      return this.http.post(this.base_url + 'subadminperm', param, {
        headers: this.reqHeader,
    })
}

addsellerData(param:any):Observable<any> 
{  console.log(param)
  return this.http.post(this.base_url + 'selleradd', param, {
    headers: this.reqHeader,
})
}
}
