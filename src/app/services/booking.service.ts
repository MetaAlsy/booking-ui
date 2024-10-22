import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";


export interface Booking {
  id: number;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  userId: number;
  roomNumber: string;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8088/api/booking'
  constructor(private readonly httpClient: HttpClient) { }
  saveBooking(booking: Booking): Observable<Booking> {
    return this.httpClient.post<Booking>(`${this.baseUrl}`, booking);
  }


  findAllBookings(page: number = 0, size: number = 10): Observable<Booking[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.httpClient.get<Booking[]>(`${this.baseUrl}`, { params });
  }


  findBookingById(bookingId: number): Observable<Booking> {
    return this.httpClient.get<Booking>(`${this.baseUrl}/${bookingId}`);
  }


  cancelBooking(booking: number): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}/cancel`, booking);
  }
}
