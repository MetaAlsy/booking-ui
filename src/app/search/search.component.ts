import {Component, OnInit, TemplateRef} from '@angular/core';
import {Room, RoomType} from "../pages/room-card/room-card.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RoomDataSearchService} from "../services/room-data-search.service";
import {Router} from "@angular/router";
export interface Criteria{

  address: string,
  roomType: { name: string,  pricePerNight: number, capacity: number },
  startDate:string,
  endDate: string
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  room: {
    address: string;
    roomType: { name: string;   pricePerNight: number; capacity: number };
    startDate: string;
    endDate: string
  } = {
    address: "", endDate: "", roomType: {capacity: 0, name: "", pricePerNight: 0}, startDate: ""
  }
  constructor(protected modalService: NgbActiveModal, private roomDataService: RoomDataSearchService,private router: Router) {
  }
  ngOnInit() {
    console.log('Modale aperto');

  }

  searchRooms() {
    if (this.room && this.room.roomType) {
      const criteria: Criteria = {
        address: this.room.address,
        roomType: {
          name: this.room.roomType.name,
          pricePerNight: this.room.roomType.pricePerNight,
          capacity: this.room.roomType.capacity
        },
        startDate: this.room.startDate,
        endDate: this.room.endDate
      };
      this.roomDataService.setRoomData(criteria);
      //this.modalService.dismissAll();
      this.modalService.close()
      //this.modalService.dismiss()
      //this.router.navigate(['rooms/'])
      console.log("Appro room-list")
      this.router.navigate(['rooms', 0]);
    }
  }

}
