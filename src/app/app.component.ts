import { Component } from '@angular/core';
import {KeycloakService} from "./services/keycloak/keycloak.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Booking';

  constructor(private keycloakService: KeycloakService) {}

  login() {
    this.keycloakService.login();
  }
  logout(){
    this.keycloakService.logout()
  }
}
