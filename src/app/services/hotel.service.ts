import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

export interface Hotel{
  id?:number,
  name:string,
  address:string,
  phone:string
  email:string,
  stars:number,
  chekingDate:string
  chekoutDate:string

}

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'http://localhost:8088/api/hotels'

  constructor(private readonly httpClient: HttpClient) { }

  getAllHotels(page:number =0,size:number =10):Observable<Hotel[]>{
    const params = new HttpParams()
      .set('page',page.toString())
      .set('size',size.toString())
    return this.httpClient.get<Hotel[]>(this.baseUrl,{params})
  }

  addHotel(hotel: {
    address: string;
    checkinTime: string;
    name: string;
    phone: string;
    checkoutTime: string;
    email: string;
    stars: number;
  }): Observable<Hotel> {
    return this.httpClient.post<Hotel>(this.baseUrl, hotel);
  }


}
