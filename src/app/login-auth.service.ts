import { Injectable, Inject } from '@angular/core';
import { LoginStatusService } from './login-status.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {


  constructor(@Inject(LoginStatusService) private loginStatusService:LoginStatusService, @Inject(Router) private router:Router) { }
  
  canActivate(route:ActivatedRouteSnapshot): boolean {
    if (this.loginStatusService.isLoggedIn == false){
      alert("Please Login");
      this.router.navigateByUrl("/");
    }
    return this.loginStatusService.isLoggedIn;
  }
}