import {EventEmitter, Injectable, Output} from '@angular/core';
import {Room} from "../pages/room-card/room-card.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomDataSearchService {
  private roomSubject = new BehaviorSubject<Partial<any>>({});
  roomData$ = this.roomSubject.asObservable();//$ per convenzione di observable


  constructor() { }
  setRoomData(data: Partial<any>) {
    this.roomSubject.next(data);
  }
}
