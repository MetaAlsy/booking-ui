import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AvailableDate, RoomService} from "../services/room.service";

@Component({
  selector: 'app-add-available-date',
  templateUrl: './add-available-date.component.html',
  styleUrl: './add-available-date.component.css'
})
export class AddAvailableDateComponent {
  dataErr:boolean = false;
  availableDateIni:AvailableDate=<AvailableDate>{}
  availableDateFin:AvailableDate=<AvailableDate>{}
  @Input() hotelId!: number;
  @Input() roomNumber!: number;
  @Input() roomId!:number

  @Output() dateAdded = new EventEmitter<any>();
  constructor(protected modalService:NgbActiveModal,private roomService:RoomService) {
  }
  validateDates() {
    if (this.availableDateIni && this.availableDateFin) {
      this.dataErr = new Date(this.availableDateIni.aviableDate) > new Date(this.availableDateFin.aviableDate);
    } else {
      this.dataErr = false;
    }
  }
  addRoomWithDates() {
    if (!this.dataErr && this.availableDateIni) {
      console.log("Data aggiunta a room"+this.roomId)
      console.log("Data aggiunta a room"+this.availableDateIni.aviableDate)
      this.roomService.addAvailableDate(this.roomId,this.availableDateIni,this.availableDateFin).subscribe({
        next: (id)=>{
          console.log("Data aggiunta a room"+id)
          this.dateAdded.emit()
        },
        error:(e)=>{console.log("Eroore nel caricamento"+e)}
      })
      console.log('Aggiunta stanza con date:', this.availableDateIni +"-"+this.availableDateFin);
      this.modalService.close() // Chiudi il modale al termine
    }
  }

}
