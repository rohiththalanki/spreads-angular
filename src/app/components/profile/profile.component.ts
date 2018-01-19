import {Component, OnInit, AfterViewInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";

declare const $:any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'

})
export class ProfileComponent implements AfterViewInit{
  public profileform: FormGroup;
  public error = false;
  public errormessage = '';
  public books:any;
  public datas:any;
  public clicked = true;
  constructor(private data: DataService) {
    this.data.navshow = true;
this.data.getdata()

    let followed=[];
    this.data.userdet.booksfollowed.forEach((e) => {
        this.data.bookdata.forEach((c)=>{
          if(c.title== e){
            followed.push(c);
          }

        });
    });
    this.books=followed;


  }
  ngAfterViewInit()
  {
    $('.selection.dropdown')
       .dropdown();
  }

  editprofile(){
    $('.ui.modal')
      .modal('show');
  }
  save(){
    this.data.update();
  }


 }
/**
 * Created by harsh on 14-08-2017.
 */
