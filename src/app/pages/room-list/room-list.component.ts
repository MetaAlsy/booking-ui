import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../room-card/room-card.component";
import {KeycloakService} from "../../services/keycloak/keycloak.service";
import {RoomDataSearchService} from "../../services/room-data-search.service";
import {Criteria} from "../../search/search.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddRoomComponent} from "../../add-room/add-room.component";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit{
  contextOwner: boolean= false
  page=0;
  size=8;
  rooms: Room[] = []
  pages: any = [];
  hotelId!: number ;
  searchCriteria: Partial<Criteria> = {}

  constructor(
    private roomService:RoomService,
    private router:ActivatedRoute,
    private keycloak:KeycloakService,
    private roomDataService: RoomDataSearchService,
    private modalService:NgbModal
  ) {
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
      if(this.hotelId!=0){
      console.log("Appro all rooms"+params['hotelId'])
      this.findAllRooms();}
      else {
        console.log("Appro all roomsAvanzato "+params['hotelId'])
        this.roomDataService.roomData$.subscribe((data: Partial<Criteria>) => {
          this.searchCriteria = data;
          console.log("ricevo paramentri di ricerca "+params['hotelId'])
          this.searchRooms();
        })
      }
    })

  }

  private findAllRooms() {
    if(!this.contextOwner) {//per adesso e negato
      this.roomService.getAllRooms(this.page, this.size, this.hotelId).subscribe({
        next: (rooms) => {
          this.rooms = rooms
        }
      })
    }
  }
  goToPage(page: number) {
    this.page = page;
    this.findAllRooms();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllRooms();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllRooms();
  }



  goToNextPage() {
    this.page++;
    this.findAllRooms();
  }


  private searchRooms() {
    console.log("Invio i dati "+this.searchCriteria.address+ this.searchCriteria.startDate +this.searchCriteria.endDate)
    this.roomService.findAllRoomsAvanzato(this.searchCriteria.address,this.searchCriteria.roomType?.pricePerNight,this.searchCriteria.roomType?.name,this.searchCriteria.roomType?.capacity,
      this.searchCriteria.startDate,this.searchCriteria.endDate,this.page,this.size).subscribe({
      next: (rooms) => {
        this.rooms = rooms
      }
    })
  }

  isOwner() {
    return this.keycloak.hasRole('owner');
  }

  openAddRoom() {
    console.log("Aperto peraggiunta o / modifica)")
    const modal =this.modalService.open(AddRoomComponent)
    modal.componentInstance.hotelID=this.hotelId
    modal.componentInstance.roomAdded.subscribe((newRoom:any)=>{
      this.findAllRooms()
    })
  }

  updateList() {
    console.log("XOXO 3")
    this.findAllRooms()
  }
}
