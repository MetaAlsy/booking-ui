import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "../../services/keycloak/keycloak.service";
import {SearchComponent} from "../../search/search.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddRoomComponent, RoomREQ} from "../../add-room/add-room.component";

export interface RoomType {
  id: number;
  name: string;
  description: string;
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
  constructor(private keycloak:KeycloakService,private modalService:NgbModal) {
  }
  isAdmin(){
    return this.keycloak.hasRole('owner');
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

  bookRoom() {

  }

  onEdit() {
    const modal = this.modalService.open(AddRoomComponent);
    modal.componentInstance.hotelID=this._room.hotelId//prima aggiorno id per trovare tutti i tipi
    modal.componentInstance.roomUpdate = <RoomREQ>{
      hotelID: this._room.hotelId,
      roomNumber: this._room.roomNumber,
      roomTypeID: this._room.roomType.id,
      capacity: this._room.roomType.capacity,
      name: this._room.roomType.name,
      pricePerNight: this._room.roomType.pricePerNight,
      description: this._room.roomType.description,
      status: this._room.status
    };

    console.log('Dati stanza passati a roomUpdate In particolare hotelId:',this._room.hotelId)
    console.log('Dati stanza passati a roomUpdate:', modal.componentInstance.roomUpdate);
  }

  onDelete() {

  }
}
