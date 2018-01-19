import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import {Router} from '@angular/router'
import {DataService} from "./data.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: DataService,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(!this.authService.isAuthenticated())
    {
      this.router.navigate(['../login']);
    }
    return this.authService.isAuthenticated();
  }
}
