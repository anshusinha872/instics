import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private UserService: UserService,
  private sessionService:SessionService) { }
  profileData: any;
  setProfileData(data) {
    this.profileData = data;
  }
  getProfileData(){
    return this.profileData;
  }
}
