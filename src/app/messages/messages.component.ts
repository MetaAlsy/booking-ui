import { Component } from '@angular/core';
import {MessagesService} from "../services/messages/messages.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  constructor(public messageService: MessagesService){}
}
