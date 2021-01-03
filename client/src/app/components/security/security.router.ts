import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SecurityService } from 'src/app/service/security.service';

@Injectable()
export class SecurityRouter implements CanActivate {
  constructor(
    private securityServices: SecurityService,
    private router: Router
  ) {}

  // * controll the access of the components
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.securityServices.onSession()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
