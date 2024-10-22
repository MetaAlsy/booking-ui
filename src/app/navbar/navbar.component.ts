import {Component, TemplateRef} from '@angular/core';
import {KeycloakService} from "../services/keycloak/keycloak.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = false;
  constructor(private keycloak:KeycloakService, private modalService:NgbModal) {
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
  openSearchModal()  {

    this.modalService.open(SearchComponent);
  }

}
