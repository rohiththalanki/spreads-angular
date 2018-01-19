import {AfterViewInit, Component} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from "@angular/router";
declare const $: any;
@Component({
  selector: 'app-spread',
  templateUrl: './spread.component.html',
  styleUrls: ['./spread.component.css']
})
export class SpreadComponent implements AfterViewInit {
  public changed = true;
  public until = 0;
  public books = [];
  public search: any = ''

  constructor(private data: DataService, private route: Router) {
    this.data.navshow = true;
    this.books = this.data.bookdata;


  }

  ngAfterViewInit() {
    $('.selection.dropdown')
      .dropdown();
  }

  change() {
    console.log(this.search)
    this.books = []
    this.data.bookdata.forEach(e => {
      if (this.search != '') {
        if (JSON.stringify(e).toLowerCase().includes(this.search.toLowerCase())) {
          this.books.push(e)
        }
      }
      else {
        this.books = this.data.bookdata
      }
    })
  }

  check() {
    if (this.data.bookdata && this.until == 0) {
      this.books = this.data.bookdata;
      this.until = 1;
    }
    return true;
  }

  move(s: any) {

    this.route.navigate(['../course'], {queryParams: {id: s}});
  }
}

