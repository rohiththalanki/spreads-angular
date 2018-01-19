import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Router} from "@angular/router";
declare const $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
  public myloginform: FormGroup;
  constructor(private data: DataService,private router:Router) {
    this.data.navshow = true;
    this.myloginform = new FormGroup({'email':  new FormControl('', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      'password': new FormControl('', [Validators.required])
    });
    $('body').css({
      'background-color' : '#f4f4ef'
    });
  }
  ngOnInit()  {
    $('body').css({
      'background-color' : '#f4f4ef'
    });
  }
  ngOnDestroy()  {
    $('body').css({
      'background-color' : 'white'
    });
  }
  login()
  {
    this.data.login(this.myloginform.value);

  }
  googlelogin()
  {
    console.log("clicked");
    this.data.logwithgoogle();
  }

  logincheck()
  {
    if(this.data.isAuthenticated())
    {
      this.router.navigate(['../home']);
    }
    else {
      return true
    }
  }
}
