import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hotel} from "./hotel.service";
import {Room} from "../pages/room-card/room-card.component";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:8088/api/rooms'


  constructor(private readonly httpClient:HttpClient) { }
  getAllRooms(page:number =0,size:number =10, hotelId:number):Observable<Room[]>{
    const params = new HttpParams()
      .set('page',page.toString())
      .set('size',size.toString())
      .set('hotel',hotelId.toString())
    return this.httpClient.get<Room[]>(this.baseUrl,{params})
  }
}
