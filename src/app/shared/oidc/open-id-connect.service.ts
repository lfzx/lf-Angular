import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenIdConnectService {

  private userManager: UserManager = new UserManager(environment.openIdConnectSettings);

  // 当前登录用户
  private currentUser: User;

  // 该对象处理用户登录/登出成功事件,(1)设置缓存大小,可以把之前的一次在订阅之前刚好发生的广播内容发给订阅者
  userLoaded$ = new ReplaySubject<boolean>(1);

  // 判断当前用户是否已经登录
  get userAvailable(): boolean {
    return this.currentUser != null;
  }

  // 把登录用户对象取出来
  get user(): User {
    return this.currentUser;
  }

  constructor() {
    // 清理缓存状态
    this.userManager.clearStaleState();

    // 处理用户登录成功事件
    this.userManager.events.addUserLoaded(user => {
      if (!environment.production) {
        console.log('User loaded.', user);
      }
      this.currentUser = user;
      // 广播
      this.userLoaded$.next(true);
    });
// 处理用户登出成功事件
    this.userManager.events.addUserUnloaded((e) => {
      if (!environment.production) {
        console.log('User unloaded');
      }
      this.currentUser = null;
      this.userLoaded$.next(false);
    });
  }

  triggerSignIn() {
    this.userManager.signinRedirect().then(() => {
      if (!environment.production) {
        console.log('Redirection to signin triggered.');
      }
    });
  }

  // 登录成功后的回调
  handleCallback() {
    this.userManager.signinRedirectCallback().then(user => {
      if (!environment.production) {
        console.log('Callback after signin handled.', user);
      }
    });
  }

  handleSilentCallback() {
    this.userManager.signinSilentCallback().then(user => {
      this.currentUser = user;
      if (!environment.production) {
        console.log('Callback after silent signin handled.', user);
      }
    });
  }

  triggerSignOut() {
    this.userManager.signoutRedirect().then(resp => {
      if (!environment.production) {
        console.log('Redirection to sign out triggered.', resp);
      }
    });
  }

}
