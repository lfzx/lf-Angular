import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenIdConnectService } from './open-id-connect.service';

@Injectable({
  providedIn: 'root'
})
export class RequireAuthenticatedUserRouteGuard implements CanActivate {

  constructor(
    private openIdConnectService: OpenIdConnectService,
    private router: Router) { }
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.openIdConnectService.userAvailable) {
        return true;// 返回true则证明有权限
      } else {
        // 跳转到登录页
        this.openIdConnectService.triggerSignIn();
        return false;
      }
    }
}
