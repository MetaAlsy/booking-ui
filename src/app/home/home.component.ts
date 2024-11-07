import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../services/keycloak/keycloak.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Booking, BookingService} from "../services/booking.service";
import {Router} from "@angular/router";

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
  //booking: Booking

  constructor(private keycloak:KeycloakService, /*private modalService:NgbModal,*/ private bookingService: BookingService,) {}

  ngOnInit() {
    const profile = this.keycloak.profile;
    this.name = profile?.firstName
    this.surname = profile?.lastName
    this.email = profile?.email
    this.bookingService.findAllBookings(0,10).subscribe((b:Booking[])=>{this.bookings=b; console.log("Dati ricevuti"+b)},e=>{ console.error('Errore durante il recupero delle prenotazioni:', e)})//messaggio)
    console.log(this.bookings[0])
    console.log(this.bookings)
  }


  cancelReservation(id: number) {
    console.log("Efettuo cancellazione")
    this.bookingService.cancelBooking(id).subscribe()
  }
}
