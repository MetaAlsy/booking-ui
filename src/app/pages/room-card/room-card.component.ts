import { Component } from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
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
export class RoomCardComponent {


}
