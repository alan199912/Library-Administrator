import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDialogComponent } from './book-dialog.component';

const routes: Routes = [{ path: '', component: BookDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookDialogRoutingModule {}
