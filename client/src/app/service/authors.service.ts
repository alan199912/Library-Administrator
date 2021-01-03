import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  baseUrl = environment.baseUrl;
  private authorList: Author[] = [];

  // * evaluate the author's arrangement
  // * data async
  private authorsSubject = new Subject<Author[]>();

  constructor(private http: HttpClient) {}

  // * get all the data
  getAuthors() {
    this.http.get<Author[]>(`${this.baseUrl}api/author`).subscribe((data) => {
      this.authorList = data;
      this.authorsSubject.next([...this.authorList]);
    });
  }

  // * get the data to sent in client
  getCurrentListener() {
    return this.authorsSubject.asObservable();
  }
}
