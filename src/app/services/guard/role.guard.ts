import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "../keycloak/keycloak.service";

export const roleGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;

  const hasRole = keycloakService.keycloak.hasResourceRole(requiredRole) ||
    keycloakService.keycloak.hasRealmRole(requiredRole);

  if (!hasRole) {
    keycloakService.login()
    return false;
  }
  return true;
};
