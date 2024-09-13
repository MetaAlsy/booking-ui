import { Component } from '@angular/core';
import {Hotel, HotelService} from "../services/hotel.service";
import {MessagesService} from "../services/messages/messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {
  hotels:Hotel[] = [];
  constructor(private hotelService:HotelService,private messageService : MessagesService, private router: Router,) {
  }
  ngOnInit(): void {
    this.getHotels();
  }
  getHotels(){
    this.hotelService.getAllHotels().subscribe((hotels)=>(this.hotels=hotels), error => this.messageService.add("Errore caricamento hotel"))
  }

  trackById(index: number, item: Hotel): number {
    return item.id!;
  }

  viewRooms(id: number | undefined) {
    this.router.navigate(['rooms']);
  }
}
