import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityRouter } from './components/security/security.router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
    canActivate: [SecurityRouter],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'book',
    loadChildren: () =>
      import('./components/book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'book-dialog',
    loadChildren: () =>
      import('./components/book-dialog/book-dialog.module').then(
        (m) => m.BookDialogModule
      ),
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./components/authors/authors.module').then(
        (m) => m.AuthorsModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/security/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/security/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityRouter],
})
export class AppRoutingModule {}
