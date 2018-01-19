import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Router} from "@angular/router";
declare let $:any;
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  public addbookform: FormGroup;
  constructor(private data: DataService,private router:Router) {
    this.data.navshow = true;
    this.addbookform = new FormGroup({
      'title':  new FormControl('', [Validators.required]),
      'author' : new FormControl('',[Validators.required]),
      'about': new FormControl('', [Validators.required]),
      'picture': new FormControl(''),
      'followers': new FormControl('0')
    });
    $('body').css({
      'background-color' : '#f4f4ef'
    });
  }

  ngOnInit() {
  }

  addbook(){
    console.log(this.addbookform.value)
    this.data.addBooks(this.addbookform.value)
  }
}
