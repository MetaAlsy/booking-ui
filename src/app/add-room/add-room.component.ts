import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {Room,RoomType} from "../pages/room-card/room-card.component";
import {ModalDismissReasons, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../services/hotel.service";
import {MessagesService} from "../services/messages/messages.service";
import {RoomService} from "../services/room.service";
import {ActivatedRoute} from "@angular/router";


export interface RoomREQ {
  roomNumber: number,
  hotelID: number,
  roomTypeID:number,
  name: string,
  description: string,
  pricePerNight: number,
  capacity: number,
  status: string
}

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent implements OnInit,OnChanges{
  room!:RoomREQ
  @Input()hotelID!: number;
  closeResult = '';
  roomTypes!: RoomType[];
  @Input() roomUpdate!:RoomREQ
  selectedPicture: string | undefined;
  selectedPictureOut: any;
  @Output() roomAdded = new EventEmitter<any>()
  protected selectedType: boolean = false
  constructor(private router: ActivatedRoute,protected modalService: NgbActiveModal, private roomService:RoomService, private messageService: MessagesService) {}

  ngOnInit() {
    console.log('Modale aperto per modifica');

    // Reset dei campi nel caso di nuovo inserimento
    this.resetInput();

    // Carica i tipi di stanza dall'API
    this.roomService.getTypes(this.hotelID).subscribe({
      next: (types: RoomType[]) => {
        this.roomTypes = types;
        // Se è in modalità modifica, riempi i campi con i dati della stanza
        if (this.roomUpdate) {
            this.populateRoomForUpdate();

        }
      },
      error: (err) => {
        console.error('Errore nel caricamento dei tipi di stanza', err);
      }
    });
  }
  private populateRoomForUpdate() {
    console.log('Aggiornamento della stanza in modalità modifica:', this.roomUpdate);

    // Popola la stanza con i dati ricevuti
    this.room = { ...this.roomUpdate };


    // Cerca il tipo di stanza selezionato
    const selectedRoomType = this.roomTypes.find(type => type.id === this.room.roomTypeID);
    if (selectedRoomType) {
      // Riempie i campi con i dettagli del tipo di stanza
      this.room.name = selectedRoomType.name;
      this.room.description = selectedRoomType.description;
      this.room.pricePerNight = selectedRoomType.pricePerNight;
      this.room.capacity = selectedRoomType.capacity;
    }
  }

  addRoom() {
    if (!this.room.roomNumber || !this.room.hotelID || !this.room.status ||
      !this.room.name || !this.room.pricePerNight ||
      !this.room.capacity) {
      alert('Per favore, completa tutti i campi obbligatori.');
      return;
    }

    if (isNaN(this.room.roomNumber) || this.room.roomNumber <= 0) {
      alert('Il numero della stanza deve essere un numero positivo.');
      return;
    }

    if (isNaN(this.room.pricePerNight) || this.room.pricePerNight <= 0) {
      alert('Il prezzo per notte deve essere un numero positivo.');
      return;
    }

    if (isNaN(this.room.capacity) || this.room.capacity <= 0) {
      alert('La capacità della stanza deve essere un numero positivo.');
      return;
    }
    this.roomService.addRoom(this.room).subscribe(
      success => {
        console.log('Stanza aggiunto con successo!');

        this.roomAdded.emit()
        const roomId = success
        if(this.selectedPicture){
          this.roomService.uploadRoomPhoto(roomId,this.selectedPictureOut).subscribe({
            next:() =>{console.log("Foca caricata")
              this.roomAdded.emit()},

            error: (e) => console.error("Errore caricamento foto",e)
          })
        }
      },
      error => {
        this.messageService.add('Errore durante l\'aggiunta della stanza.');
      }
    );
    this.modalService.close();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['roomUpdate'] && this.roomUpdate) {
      console.log('Aggiornamento della stanza in modalità modifica:', this.roomUpdate);

      // Popola la stanza con i dati ricevuti
      this.room = { ...this.roomUpdate };

      // Aggiorna anche i dettagli del tipo di stanza selezionato
      const selectedRoomType = this.roomTypes?.find(type => type.id === this.room.roomTypeID);
      if (selectedRoomType) {
        this.selectedType = true
        this.room.name = selectedRoomType.name;
        this.room.description = selectedRoomType.description;
        this.room.pricePerNight = selectedRoomType.pricePerNight;
        this.room.capacity = selectedRoomType.capacity;
      }
    }
  }
  private resetInput(): void {


      this.room = <RoomREQ>{
        hotelID: this.hotelID,
        roomNumber: 0,
        roomTypeID: 0,
        capacity:0,
        name:"",
        pricePerNight:0,
        description:"",
        status: ""
      };

  }




  onRoomTypeNameInput(event: any): void {
    const selectedRoomTypeName = event.target.value;

    // Trova il tipo di stanza selezionato in base al nome
    const selectedRoomType = this.roomTypes.find(roomType => roomType.name === selectedRoomTypeName);

    if (selectedRoomType) {
      // Riempie automaticamente i campi del form con i dettagli del tipo di stanza selezionato
      this.room.roomTypeID = selectedRoomType.id;
      this.room.name = selectedRoomType.name;
      this.room.description = selectedRoomType.description;
      this.room.pricePerNight = selectedRoomType.pricePerNight;
      this.room.capacity = selectedRoomType.capacity;
    } else {
      // Se l'utente ha inserito manualmente un nome non trovato, non riempiamo automaticamente i campi
      this.room.roomTypeID = 0;  // ID non sarà popolato automaticamente
    }
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



  onFileSelected(event: any) {
    this.selectedPictureOut = event.target.files[0];
    console.log(this.selectedPictureOut);

    if (this.selectedPictureOut) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedPictureOut);
    }

  }
}
