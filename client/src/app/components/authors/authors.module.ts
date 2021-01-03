import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { AuthorsService } from 'src/app/service/authors.service';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  providers: [AuthorsService],
})
export class AuthorsModule {}
