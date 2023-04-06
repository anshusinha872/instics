import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root',
})
export class ServiceActiveStatusGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastManager: ToastrManager
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

      let serviceId;
      if (route.routeConfig.path == 'print') {
        serviceId = 1;
      }
      else if (route.routeConfig.path == 'laundry') {
        serviceId = 2;
      }
      let req = {
        serviceId: serviceId,
      };
      // console.log('canactive',route.routeConfig.path);
      console.log('canactive',req);
    return this.userService.checkServiceActive(req).toPromise().then((res) => {
      console.log(res);
      if (res.statusCode == 200) {
        return true;
      } else {
        this.toastManager.errorToastr(res.data);
        this.router.navigate(['/dashboard']);
        return false;
      }
    });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('canload', UrlTree);
    return true;
  }
}
