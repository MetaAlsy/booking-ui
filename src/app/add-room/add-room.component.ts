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
  roomTypes!: RoomType[];
  @Input() roomUpdate!:RoomREQ
  selectedPicture: string | undefined;
  selectedPictureOut: any;
  @Output() roomAdded = new EventEmitter<any>()
  protected selectedType: boolean = false
  protected rUpdate:boolean=false
  constructor(private router: ActivatedRoute,protected modalService: NgbActiveModal, private roomService:RoomService, private messageService: MessagesService) {}

  ngOnInit() {
    console.log('Modale aperto per modifica');

    this.resetInput();

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

    this.room = { ...this.roomUpdate };
    this.rUpdate=true

    const selectedRoomType = this.roomTypes.find(type => type.id === this.room.roomTypeID);
    if (selectedRoomType) {

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
    if(this.roomUpdate) {
      console.log("Dati per aggiornare"+this.roomUpdate.name+"<--Nome",this.roomUpdate.hotelID,this.roomUpdate.roomNumber,this.roomUpdate.roomTypeID,this.roomUpdate.pricePerNight,this.roomUpdate.capacity,)
      this.roomService.updateRoom(this.room).subscribe(
        success => {
          console.log('Stanza aggiornate con successo!');
          this.roomAdded.emit()
          const roomId = success
          if (this.selectedPicture) {
            this.roomService.uploadRoomPhoto(roomId, this.selectedPictureOut).subscribe({
              next: () => {
                this.roomAdded.emit()
                console.log("Foto aggiornata")
              },
              error: (e) => console.error("Errore caricamento foto", e)
            })
          }
        },
        error => {
          this.messageService.add('Errore durante l\'aggiunta della stanza.');
        }
      );
    }else{
      this.roomService.addRoom(this.room).subscribe(
        success => {
          console.log('Stanza aggiunto con successo!');

          this.roomAdded.emit()
          const roomId = success
          if (this.selectedPicture) {
            this.roomService.uploadRoomPhoto(roomId, this.selectedPictureOut).subscribe({
              next: () => {
                console.log("Foca caricata")
                this.roomAdded.emit()
              },

              error: (e) => console.error("Errore caricamento foto", e)
            })
          }
        },
        error => {
          this.messageService.add('Errore durante l\'aggiunta della stanza.');
        }
      );
    }
    this.modalService.close();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['roomUpdate'] && this.roomUpdate) {
      console.log('Aggiornamento della stanza in modalità modifica:', this.roomUpdate);


      this.room = { ...this.roomUpdate };

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

    const selectedRoomType = this.roomTypes.find(roomType => roomType.name === selectedRoomTypeName);

    if (selectedRoomType) {
      this.selectedType=true
      this.room.roomTypeID = selectedRoomType.id;
      this.room.name = selectedRoomType.name;
      this.room.description = selectedRoomType.description;
      this.room.pricePerNight = selectedRoomType.pricePerNight;
      this.room.capacity = selectedRoomType.capacity;
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
