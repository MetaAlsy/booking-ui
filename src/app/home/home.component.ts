import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../services/keycloak/keycloak.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Booking, BookingService} from "../services/booking.service";
import {Router} from "@angular/router";
import {Room} from "../pages/room-card/room-card.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  name:string | undefined
  surname:string | undefined
  email:string | undefined
  bookings:Booking[]=[]
  size=4;
  rooms: Room[] = []
  pages: any = [];
  page=0;


  constructor(private keycloak:KeycloakService, private bookingService: BookingService,) {}

  ngOnInit() {
    const profile = this.keycloak.profile;
    this.name = profile?.firstName
    this.surname = profile?.lastName
    this.email = profile?.email
    this.findBookings()
    console.log(this.bookings[0])
    console.log(this.bookings)
  }
  findBookings(){
    this.bookingService.findAllBookings(this.page,this.size).subscribe((b:Booking[])=>{this.bookings=b; console.log("Dati ricevuti"+b)},e=>{ console.error('Errore durante il recupero delle prenotazioni:', e)})//messaggio)
  }


  cancelReservation(id: number) {
    console.log("Efettuo cancellazione")
    this.bookingService.cancelBooking(id).subscribe((next:any)=>{
      this.findBookings()
    },(er:any)=>{console.log("Eroore aggiornamento")})
  }
  goToPage(page: number) {
    this.page = page;
    this.findBookings();
  }

  goToFirstPage() {
    this.page = 0;
    this.findBookings();
  }

  goToPreviousPage() {
    this.page --;
    this.findBookings();
  }



  goToNextPage() {
    this.page++;
    this.findBookings();
  }
}
