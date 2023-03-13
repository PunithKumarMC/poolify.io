import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service'
import { RegisterServiceService } from '../services/register-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private register:RegisterServiceService){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard();
  }
  

  isvalid: boolean = false;
  guard() {
    const isAuthenticated = JSON.parse(sessionStorage.getItem('userLoggedIn')!)
    console.log("guard "+this.isvalid)
    if (isAuthenticated) {
      return true;
    }
    else {
      return this.router.navigate(["/login"]);
    }
  }
  
}