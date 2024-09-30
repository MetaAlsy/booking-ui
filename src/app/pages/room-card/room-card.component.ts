import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

export interface RoomType {
  id: number;
  name: string;
  description?: string;
  pricePerNight: number;
  capacity: number;
}

export interface Room {
  roomNumber: number;
  hotelId: number;
  roomType: RoomType;
  status: string;
}
@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  private _room :Room = <Room>{};
  private _roomImg: string | undefined;
  get room():Room{
   return this._room;
  }
  @Input()
  set room(value: Room) {
    this._room = value;
  }
  get roomImg(): string | undefined {
    if (false/*this._room.img*/) {
      return 'data:image/jpg;base64,' + this._roomImg//da fare
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }
}
