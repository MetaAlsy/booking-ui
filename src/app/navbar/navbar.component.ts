import { Component } from '@angular/core';
import {KeycloakService} from "../services/keycloak/keycloak.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = false;
  constructor(private keycloak:KeycloakService) {
    this.isLoggedIn = this.keycloak.keycloak.authenticated || false;
  }
  login(){
    this.keycloak.login();
  }
  logout(){
    this.keycloak.logout();
  }
  isOwner(): boolean {
    return this.keycloak.hasRole('owner');
  }

}
