import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KeycloakService} from "./services/keycloak/keycloak.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
export function kcFactory(kcService:KeycloakService){
  return ()=>kcService.init()
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OwnerHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpTokenInterceptor,
        multi:true
     },
    {
    provide:APP_INITIALIZER,
    deps: [KeycloakService],
    useFactory: kcFactory,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
