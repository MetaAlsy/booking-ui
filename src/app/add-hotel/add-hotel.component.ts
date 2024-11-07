import {Component, EventEmitter, Output, TemplateRef} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessagesService} from "../services/messages/messages.service";
import {HotelService} from "../services/hotel.service";

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {
  hotel = {
    name: '',
    address: '',
    phone: '',
    email: '',
    stars: 1,
    checkinTime: '',
    checkoutTime: ''
  };
  closeResult = '';
  @Output() hotelAdded = new EventEmitter<any>();
  constructor(private modalService: NgbModal, private hotelService: HotelService, private messageService: MessagesService) {}
  open(content: TemplateRef<any>): void {
    this.resetInput();  // Resetta i dati del modulo
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  addHotel(): void {
    // Validazione del modulo
    if (!this.hotel.name || !this.hotel.address || !this.hotel.phone || !this.hotel.email || !this.hotel.stars || !this.hotel.checkinTime || !this.hotel.checkoutTime) {
      alert('Per favore, completa tutti i campi.');
      return;
    }

    if (isNaN(this.hotel.stars) || this.hotel.stars < 1 || this.hotel.stars > 5) {
      alert('Il numero di stelle deve essere compreso tra 1 e 5.');
      return;
    }

    this.hotelService.addHotel(this.hotel).subscribe(
      success => {
        console.log('Hotel aggiunto con successo!');
        this.hotelAdded.emit() // Delay di 1 secondo
      },
      error => {
        this.messageService.add('Errore durante l\'aggiunta dell\'hotel.');
      }
    );

    this.modalService.dismissAll();  // Chiudi il modale
  }

  private resetInput(): void {
    this.hotel = {
      name: '',            // Cambiato da nome a name
      address: '',
      phone: '',           // Cambiato da telefono a phone
      email: '',
      stars: 1,           // Cambiato da stelle a stars
      checkinTime: '',    // Cambiato da checkin a checkinTime
      checkoutTime: ''
    };
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

}
