import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';

// * Service
import { BookService } from 'src/app/service/book.service';

// * Material UI
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// * Forms
import { ReactiveFormsModule } from '@angular/forms';

// * flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// * component
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [BookService, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  entryComponents: [BookDialogComponent],
})
export class BookModule {}
