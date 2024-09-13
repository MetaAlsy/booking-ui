import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit{
  page=0;
  size=5;
  constructor(
    private roomService:RoomService,
    private router:Router
  ) {
  }
  ngOnInit() {
    this.findAllRooms();
  }

  private findAllRooms() {
    this.roomService.findAllRooms(page:this.page,size:this.size).subscribe({next:(rooms)=>{

      }
    })
  }
}
