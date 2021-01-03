import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/service/authors.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
})
export class BookDialogComponent implements OnInit, OnDestroy {
  formAdd: FormGroup;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>; // * Date

  authors: Author[] = [];
  authorsSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private dialogRef: MatDialog,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.formAdd = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      datePost: ['', Validators.required],
      author: ['', Validators.required],
    });

    this.authorsService.getAuthors();
    this.authorsSubscription = this.authorsService
      .getCurrentListener()
      .subscribe((authorsDB: Author[]) => {
        this.authors = authorsDB;
      });
  }

  // * input select with ngform
  // onSelected(event: MatSelectChange) {
  //   this.formAdd.value.author = (event.source.selected as MatOption).viewValue;
  // }

  // * save a book
  addBook() {
    if (this.formAdd.valid) {
      const authorRef = {
        id: this.formAdd.value.author._id,
        fullName: this.formAdd.value.author.fullName,
      };

      const bookRef = {
        id: null,
        title: this.formAdd.value.title,
        description: this.formAdd.value.description,
        price: parseInt(this.formAdd.value.price),
        datePost: this.formAdd.value.datePost,
        author: authorRef,
      };

      this.bookService.addBook(bookRef);
      this.authorsSubscription = this.bookService
        .addBookCurrentListener()
        .subscribe(() => {
          this.dialogRef.closeAll();
        });

      this.dialogRef.closeAll(); // * close the dialog
    }
  }

  ngOnDestroy() {
    this.authorsSubscription.unsubscribe();
  }
}
