import { BooksMainComponent } from './views/books-main/books-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Adictiz'
    }
  },
  {
  path: 'result/:book',
  component: BooksMainComponent, pathMatch: 'full',
  data: {
    title: 'Adictiz Books'
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
