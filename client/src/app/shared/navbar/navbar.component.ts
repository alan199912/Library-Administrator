import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { SecurityService } from '../../service/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  userStatus: boolean;
  userSubscription: Subscription;

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.userSubscription = this.securityService.securityStatus.subscribe(
      (status) => {
        this.userStatus = status;
      }
    );
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  logOut() {
    this.securityService.logOut();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
