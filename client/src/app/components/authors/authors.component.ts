import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/service/authors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  unfoldColumns = ['name', 'surname', 'fullName', 'academicDegree'];
  dataSource = new MatTableDataSource<Author>();
  authorsSubscription: Subscription;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.authorsService.getAuthors();
    this.authorsSubscription = this.authorsService
      .getCurrentListener()
      .subscribe((data: Author[]) => {
        this.dataSource.data = data;
      });
  }

  ngOnDestroy() {
    this.authorsSubscription.unsubscribe();
  }
}
