import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SigninOidcComponent } from './shared/oidc/signin-oidc/signin-oidc.component';
import { RedirectSilentRenewComponent } from './shared/oidc/redirect-silent-renew/redirect-silent-renew.component';
import { RequireAuthenticatedUserRouteGuard } from './shared/oidc/require-authenticated-user-route.guard';
import { OpenIdConnectService } from './shared/oidc/open-id-connect.service';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { ErrorLoggerService } from './shared/error-logger.service';

registerLocaleData(en);

const routes: Routes = [
  { path: 'people', loadChildren: './people/people.module#PeopleModule' },
  { path: 'signin-oidc', component: SigninOidcComponent },
  { path: 'redirect-silentrenew', component: RedirectSilentRenewComponent },
  {path:'**',redirectTo:'people'}
];


@NgModule({
  declarations: [
    AppComponent,
    SigninOidcComponent,
    RedirectSilentRenewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    OpenIdConnectService,
    RequireAuthenticatedUserRouteGuard,
    GlobalErrorHandler,
    ErrorLoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
