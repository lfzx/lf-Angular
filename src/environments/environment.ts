// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlBase:"/api",
  openIdConnectSettings: {
    // authority为identityServer4的地址
    authority: 'https://localhost:5001/',
    // 需在identityServer4项目中设置
    client_id: 'people-client',
    // 登录成功后跳转到的地址
    redirect_uri: 'http://localhost:4200/signin-oidc',
    scope: 'openid profile email restapi',
    // 需要返回的内容
    response_type: 'id_token token',
    // 登出后返回的地址
    post_logout_redirect_uri: 'http://localhost:4200/',
    // 启用定时刷新动作，以便当用户操作过久时可以获得新的token
    automaticSilentRenew: true,
    // 重新获得token的地址
    silent_redirect_uri: 'http://localhost:4200/redirect-silentrenew'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
