import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'adz-search-books',
  templateUrl: './adz-search-books.component.html',
  styleUrls: ['./adz-search-books.component.scss']
})
export class AdSearchBooksComponent implements OnInit {

  constructor() { }
  @Input() allBooks: any[] = [];
  @Input() customBookFilter: any = { authors: '', title: '', categories: '', language: ''};

  ngOnInit() {
  }

}
