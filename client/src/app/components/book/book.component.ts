import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/book.service';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from 'src/app/models/pagination-books.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, AfterViewInit, OnDestroy {
  book = new Array<Book>();

  unfoldColumns = ['title', 'description', 'author', 'price']; // * titles of columns
  dataSource = new MatTableDataSource<Book>(); // * data type structure

  @ViewChild(MatSort) order: MatSort; // * order the table
  @ViewChild(MatPaginator) paginator: MatPaginator; // * paginator

  private bookSubcription: Subscription;

  totalBooks = 0; //* is gonna updtated when is started the bd
  booksPerPage = 2;
  itemsPerPage = [1, 2, 5, 10];
  actualPage = 1;
  sort = 'title';
  sortDirection = 'asc';
  filter = null;

  // * on search
  timeout: any = null;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    // * get all of the books (pagination)
    this.bookService.getBooks(
      this.booksPerPage,
      this.actualPage,
      this.sort,
      this.sortDirection,
      this.filter
    );

    // * call the current listener of books (pagination)
    this.bookService
      .getCurrentListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Book>(pagination.data);
        this.totalBooks = pagination.totalRows; // * total records
      });
  }

  // * filter the data to search
  // * work when the user take 1 second to end write
  onSearch(event: any) {
    // this.dataSource.filter = filter;
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout(() => {
      // * if keyCode is diff of key Enter
      if (event.keyCode != 13) {
        const filterValueLocal = {
          property: 'title',
          value: event.target.value,
        };

        // * keep the value in the session
        this.filter = filterValueLocal;

        this.bookService.getBooks(
          $this.booksPerPage,
          $this.actualPage,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 500);
  }

  openDialog() {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '450px',
    });

    // * to update the list
    dialogRef.afterClosed().subscribe(() => {
      this.bookService.getBooks(
        this.booksPerPage,
        this.actualPage,
        this.sort,
        this.sortDirection,
        this.filter
      );
    });
  }

  // * event of the pagination
  eventPagination(event: PageEvent) {
    this.booksPerPage = event.pageSize;
    this.actualPage = event.pageIndex + 1;
    // * receive the data every time that give a click
    this.bookService.getBooks(
      this.booksPerPage,
      this.actualPage,
      this.sort,
      this.sortDirection,
      this.filter
    );
  }

  orderColumns(event) {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.bookService.getBooks(
      this.booksPerPage,
      this.actualPage,
      event.active,
      event.direction,
      this.filter
    );
  }

  ngOnDestroy() {
    this.bookSubcription.unsubscribe();
  }
}
