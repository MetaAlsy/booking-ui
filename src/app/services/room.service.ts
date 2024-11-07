import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hotel} from "./hotel.service";
import {Room, RoomType} from "../pages/room-card/room-card.component";
import {RoomREQ} from "../add-room/add-room.component";
export interface AvailableDate{
  id: number;
  aviableDate: string;
  roomId: number;
  status: boolean;
}
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
  findAllRoomsAvanzato(
    address?: string,
    prezzo?: number,
    nome?: string,
    posti?: number,
    dataIn?: string,
    dataFin?: string,
    page: number = 0,
    size: number = 10
  ): Observable<Room[]> {
    let params = new HttpParams();

    if (address) {
      params = params.append('address', address);
    }
    if (prezzo) {
      params = params.append('price', prezzo.toString());
    }
    if (nome) {
      params = params.append('name', nome);
    }
    if (posti) {
      params = params.append('capacity', posti.toString());
    }
    if (dataIn) {
      params = params.append('chekIn', dataIn);
    }
    if (dataFin) {
      params = params.append('chekOut', dataFin);
    }
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    return this.httpClient.get<Room[]>(`${this.baseUrl}/avanzato`, { params });
  }

  addRoom(room: RoomREQ) {
    return this.httpClient.post<number>(`${this.baseUrl}`,room)
  }

  getTypes(hotelID: number): Observable<RoomType[]>{
    return this.httpClient.get<RoomType[]>(`${this.baseUrl}/types?hotel=${hotelID}`);
  }

  addAvailableDate(roomId: number, availableDateIni: AvailableDate, availableDateFin: AvailableDate):Observable<number> {
    let params = new HttpParams().set('iniDate', availableDateIni.aviableDate);
    if (availableDateFin) {
      params = params.set('finDate', availableDateFin.aviableDate);
    }
    return this.httpClient.post<number>(`${this.baseUrl}/aviable/${roomId}`,null, { params });
    //se non metto null angular invia body {} lo stesso forse perche post
  }

  getAllDates(page:number =0,size:number =10,roomId: number):Observable<AvailableDate[]> {
    const params = new HttpParams()
      .set('page',page.toString())
      .set('size',size.toString())
    return this.httpClient.get<AvailableDate[]>(`${this.baseUrl}/dates/${roomId}`,{params})

  }

  postState(roomId: number):Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}/stateDate/${roomId}`,null);

  }

  getAllDatesFuture(page: number, size: number, roomId: number) {
    const params = new HttpParams()
      .set('page',page.toString())
      .set('size',size.toString())
      .set('onlyFutureDates',true)
    console.log("parametri passati "+params.toString())
    return this.httpClient.get<AvailableDate[]>(`${this.baseUrl}/dates/${roomId}`,{params})
  }

  uploadRoomPhoto(roomId: number, file: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>(`${this.baseUrl}/foto/${roomId}`, formData);
  }
  deleteRoom(roomId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${roomId}` );
  }

  updateRoom(room: RoomREQ) {
    return this.httpClient.post<number>(`${this.baseUrl}/update`,room)
  }
}
