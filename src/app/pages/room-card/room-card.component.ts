import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {KeycloakService} from "../../services/keycloak/keycloak.service";
import {SearchComponent} from "../../search/search.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddRoomComponent, RoomREQ} from "../../add-room/add-room.component";
import {AddAvailableDateComponent} from "../../add-available-date/add-available-date.component";
import {ConfermBookingComponent} from "../../conferm-booking/conferm-booking.component";
import {RoomService} from "../../services/room.service";


export interface RoomType {
  id: number;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
}

export interface Room {
  id:number
  roomNumber: number;
  hotelId: number;
  roomType: RoomType;
  status: string;
  foto:string;
  hotelName:string;
}
@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  private _room :Room = <Room>{};
  @Input() _dataIni!:string
  @Input() _dataFin!:string
  private _roomImg: string | undefined;
  @Output() deletedRoom: EventEmitter<any> = new EventEmitter<any>()
  get room():Room{
   return this._room;
  }
  constructor(private keycloak:KeycloakService,private modalService:NgbModal,private router:Router,private roomService:RoomService) {
  }
  isAdmin(){
    return this.keycloak.hasRole('owner');
  }
  @Input()
  set room(value: Room) {
    this._room = value;
  }
  get roomImg(): string | undefined {
    if (this._room.foto) {
      return 'data:image/jpg;base64,' + this._room.foto//da fare
    }
    return '';
  }

  bookRoom() {
    const modal = this.modalService.open(ConfermBookingComponent);
    modal.componentInstance.roomId=this._room.id

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
    this.roomService.deleteRoom(this._room.id).subscribe({next:()=>{
      console.log("Stanza eliminata")
        this.deletedRoom.emit()
      },
      error:(err)=>{
      console.log("Errore eliminazione")
      }}
    )

  }

  onAddData() {
    console.log("room id e ==="+this._room.id)
    this.router.navigate(['roomDates', this._room.id])
  }
}
