import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from '../models/pagination-books.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = environment.baseUrl;
  private book: Book[] = [];

  bookSubject = new Subject(); // * get the data async
  bookPaginationSubject = new Subject<PaginationBooks>(); // * get the data async

  bookPagination: PaginationBooks;

  constructor(private http: HttpClient) {}

  getBooks(
    booksPerPage: number,
    actualPage: number,
    sort: string,
    sortDirection: string,
    filter: any
  ) {
    const request = {
      pageSize: booksPerPage,
      page: actualPage,
      sort,
      sortDirection,
      filter,
    };
    this.http
      .post<PaginationBooks>(`${this.baseUrl}api/book/pagination`, request)
      .subscribe((data) => {
        this.bookPagination = data;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  // * mehhod subscribe to return data
  getCurrentListener() {
    return this.bookPaginationSubject.asObservable();
  }

  addBook(book: Book) {
    this.http.post(`${this.baseUrl}api/book`, book).subscribe((data) => {
      this.bookSubject.next(); // * update the book list
    });
  }
  addBookCurrentListener() {
    return this.bookSubject.asObservable();
  }
}
