import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDialogRoutingModule } from './book-dialog-routing.module';
import { BookDialogComponent } from './book-dialog.component';

// * Material UI
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

// * flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// * Forms
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookDialogComponent],
  imports: [
    CommonModule,
    BookDialogRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class BookDialogModule {}
