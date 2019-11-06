import { AdPopupDetailsComponent } from './../adz-popup-details/adz-popup-details.component';
import { BookItem } from './../../models/BookItem';
import { BooksData } from './../../models/BooksData';
import { BooksService } from './../../services/books-service/books.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'adz-books-gallery',
  templateUrl: './adz-gallery.component.html',
  styleUrls: ['./adz-gallery.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(600, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdBooksGalleryComponent implements OnInit {
  keyword: string;
  public book :string ;
  public k : number = 0;
  public page : number =0 ;
  public numbers =[];

  constructor(
    private booksService: BooksService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private route: ActivatedRoute 
  ) { 
    this.book = this.route.snapshot.params['book'] ;
    console.log(this.book) ;
   
    console.log(this.keyword) 
  }

  public errorMsg;
  BooksData = new BooksData();
  allBooks: BookItem[] = [];
  authors : any[] =[] ;
  categories: any[] = [];
  customBookFilter: any = { authors: '', title: '', categories: '', language: '' };
  uniqueCategoriesItems: any[] = [];
  uniqueauthorItems : any[] =[] ;
  totalItems : number=0 ;
  ngOnInit() {
    this.booksService.getBooks(this.book,this.k).subscribe(
      books => {
        console.log(books);
        // this.BooksData.items = books.items;
        this.allBooks = books.items;
        this.totalItems =books.totalItems;
        this.page = Math.floor(books.totalItems/12) +1;
        this.numbers = Array(this.page).fill(0).map((x,i)=>i);
        for (let index = 0; index < books.items.length; index++) {
          const item = books.items[index];
          if (item.volumeInfo.categories) {
            this.categories.push(item.volumeInfo.categories[0]);
          }
          if(item.volumeInfo.authors){
            this.authors.push(item.volumeInfo.authors[0])
          }
        }
        this.uniqueCategoriesItems = Array.from(new Set(this.categories));
        this.uniqueauthorItems = Array.from(new Set(this.authors));
      },
      error => this.errorMsg = error
    );
    this.page =(this.totalItems/12)-(this.totalItems%12) ;
  }

  openModalDetails(book: BookItem) {
    const modalRef = this.modalService.open(AdPopupDetailsComponent);
    modalRef.componentInstance.bookById = book;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  pagination(value: number){
    this.booksService.getBooks(this.book,value).subscribe(
      books => {
        console.log(books);
        // this.BooksData.items = books.items;
        this.allBooks = books.items;
        for (let index = 0; index < books.items.length; index++) {
          const item = books.items[index];
          
          if (item.volumeInfo.categories) {
            this.categories.push(item.volumeInfo.categories[0]);
          }
          if(item.volumeInfo.authors){
            this.authors.push(item.volumeInfo.authors[0])
          }
        }
        this.uniqueCategoriesItems = Array.from(new Set(this.categories));
        this.uniqueauthorItems = Array.from(new Set(this.authors));
      },
      error => this.errorMsg = error
    );
    console.log(this.authors) ;
    this.k=value;
  }
}
