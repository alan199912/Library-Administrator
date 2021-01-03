import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

// * interfaces
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';

@Injectable()
export class SecurityService {
  securityStatus = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(usr: User) {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: usr.email,
      name: usr.name,
      surname: usr.surname,
      username: usr.username,
      password: '',
    };
    this.securityStatus.next(true);
    this.router.navigate(['/']);
  }

  loginUser(authUser: Auth) {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authUser.email,
      name: '',
      surname: '',
      username: '',
      password: '',
    };
    this.securityStatus.next(true);
    this.router.navigate(['/']);
  }

  logOut() {
    this.user = null;
    this.securityStatus.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    // * split operator to get latest data
    return { ...this.user };
  }

  onSession() {
    return this.user != null;
  }
}
