import { Component } from '@angular/core';
import {KeycloakService} from "../services/keycloak/keycloak.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private keycloak:KeycloakService) {
  }
  login(){
    this.keycloak.login();
  }
  logout(){
    this.keycloak.logout();
  }

}
