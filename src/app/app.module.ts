import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KeycloakService} from "./services/keycloak/keycloak.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { MessagesComponent } from './messages/messages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDropdownModule, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoomCardComponent } from './pages/room-card/room-card.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { SearchComponent } from './search/search.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { AddAvailableDateComponent } from './add-available-date/add-available-date.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { ConfermBookingComponent } from './conferm-booking/conferm-booking.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function kcFactory(kcService:KeycloakService){
  return ()=>kcService.init()
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OwnerHomeComponent,
    AddHotelComponent,
    MessagesComponent,

    RoomCardComponent,
    RoomListComponent,
    SearchComponent,
    AddRoomComponent,
    AddAvailableDateComponent,
    RoomDetailsComponent,
    ConfermBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbModalModule,



    HttpClientModule,

    ReactiveFormsModule
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
  },
    provideAnimationsAsync()],
  bootstrap: [AppComponent],

})
export class AppModule { }
