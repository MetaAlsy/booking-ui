import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AvailableDate, RoomService} from "../services/room.service";
import {MessagesService} from "../services/messages/messages.service";
import {DateFilterFn} from "@angular/material/datepicker";
import {range} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {BookingService} from "../services/booking.service";
import {KeycloakService} from "../services/keycloak/keycloak.service";

@Component({
  selector: 'app-conferm-booking',
  templateUrl: './conferm-booking.component.html',
  styleUrl: './conferm-booking.component.css'
})
export class ConfermBookingComponent implements OnInit{
  @Input() availableDates: string[] = []
  @Input() roomId!:number
  selectedStartDate!: string;
  selectedEndDate!: string;
  filteredEndDates: string[]= []

  page=0;
  size=31;
  isLoggedIn  = false;

  constructor(protected modalService:NgbActiveModal,private roomService:RoomService, private messageService : MessagesService,
              private bookingService:BookingService, protected keyckloackService : KeycloakService) {
  }
  ngOnInit(){
    this.getDates();
    this.isLoggedIn = this.keyckloackService.keycloak.authenticated || false
  }
  getDates(){
    this.roomService.getAllDatesFuture(this.page, this.size,this.roomId).subscribe((dates)=>{
      this.availableDates = dates.map(dateObj => dateObj.aviableDate);} , error => this.messageService.add("Errore caricamento date disponibili"))

  }
  filterEndDates(): void {
    if (this.selectedStartDate) {
      this.filteredEndDates = this.availableDates.filter(
        date => date >= this.selectedStartDate
      );
    }
  }




  conferma() {
    const booking = {
      checkinDate: this.selectedStartDate,
      checkoutDate: this.selectedEndDate,
      roomId: this.roomId
    };
    this.bookingService.saveBooking(booking).subscribe(
      response => {
        console.log('Booking salvato:', response);
      },
      error => {
        console.error('Errore durante caricamento:', error);
      }
    );
    this.modalService.dismiss()
  }


  toLogin() {
    this.keyckloackService.login()
  }
}
