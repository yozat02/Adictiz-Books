import { BooksData } from './../../models/BooksData';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as Globals from '../globals';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public min=0;
  public max=12;
  constructor(public http: HttpClient) { }

  getAllBooks(): Observable<BooksData> {
    return this.http.get<BooksData>(Globals.URL).pipe();
  }
  getBooks(book:string,k:number){
    this.min = 0+k*12 ;
    return this.http.get<BooksData>("https://www.googleapis.com/books/v1/volumes?q="+book+"&startIndex="+this.min+"&maxResults="+12).pipe();
  }

}
