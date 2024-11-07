import {Component, Input, OnInit} from '@angular/core';
import {AvailableDate, RoomService} from "../services/room.service";

import {MessagesService} from "../services/messages/messages.service";
import {ActivatedRoute} from "@angular/router";
import {AddRoomComponent, RoomREQ} from "../add-room/add-room.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAvailableDateComponent} from "../add-available-date/add-available-date.component";

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{
  dates: AvailableDate[] = [];
  @Input()roomId!:number
  page=0;
  size=10;
  pages: any = [];

  constructor(private roomService:RoomService, private messageService : MessagesService,private route: ActivatedRoute,private modalService:NgbModal){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = +params['roomId']; // "+" converte la stringa in numero
      console.log('Room ID from route: ', this.roomId);
    })
    this.getDates();

  }
  getDates(){
    this.roomService.getAllDates(this.page, this.size,this.roomId).subscribe((dates)=>(this.dates=dates) , error => this.messageService.add("Errore caricamento date disponibili"))

  }
  changeState(id: number) {
    this.roomService.postState(id).subscribe(next =>{
      this.messageService.add("Stato cambiato")
      this.getDates()
    }, error => this.messageService.add("Errore cambiamento stato"))
  }
  goToFirstPage() {
    this.page = 0;
    this.getDates();
  }

  goToPreviousPage() {
    this.page --;
    this.getDates();
  }



  goToNextPage() {
    this.page++;
    this.getDates();
  }

  goToPage(page: number) {
    this.page = page;
    this.getDates();
  }

    onAddData() {

      const modal = this.modalService.open(AddAvailableDateComponent);
      modal.componentInstance.roomId = this.roomId//va aggiunto id alla stanza
      modal.componentInstance.dateAdded.subscribe((newDate:any)=>{
        this.getDates()
      })

      console.log('Dati stanza passati a roomUpdate:', modal.componentInstance.roomId);


    }

  updateDates($event: any) {
    this.getDates();
  }
}
