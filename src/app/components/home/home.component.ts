import {Component, AfterViewInit} from '@angular/core';
import {DataService} from "../../services/data.service";
declare const $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  constructor(private data: DataService)  {
    this.data.navshow = false;
  }
  ngAfterViewInit() {
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.item')
    ;
  }
  logout()
  {
    this.data.logout();
  }

}
