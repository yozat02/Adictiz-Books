import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private rooter: Router) { }

  ngOnInit() {
  }

  search(key: string):void{
    console.log(key);
    
    this.rooter.navigate(['/result',key]);
  }

}
