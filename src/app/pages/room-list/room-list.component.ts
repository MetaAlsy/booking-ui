import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {Room} from "../room-card/room-card.component";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit{
  page=0;
  size=5;
  rooms: Room[] = []
  pages: any = [];
  hotelId!: number;
  constructor(
    private roomService:RoomService,
    private router:ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
      this.findAllRooms();
    })
  }

  private findAllRooms() {
    this.roomService.getAllRooms(this.page,this.size,this.hotelId).subscribe({next:(rooms)=>{
      this.rooms=rooms
      }
    })
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


}
