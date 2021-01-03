import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/service/security.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent implements OnInit, OnDestroy {
  @Output() closeMenu = new EventEmitter<void>();
  userStatus: boolean;
  userSubcription: Subscription;

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.userSubcription = this.securityService.securityStatus.subscribe(
      (status) => {
        this.userStatus = status;
      }
    );
  }

  onCloseMenu() {
    this.closeMenu.emit();
  }

  logOut() {
    this.onCloseMenu();
    this.securityService.logOut();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }
}
