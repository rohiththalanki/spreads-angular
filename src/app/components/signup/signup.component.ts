import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Router} from "@angular/router";
declare const $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy{
  public myloginform: FormGroup;
  constructor(private data: DataService,private router:Router)  {
    this.data.navshow = true;
    this.myloginform = new FormGroup({'email':  new FormControl('', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    ]),
      'name' : new FormControl('',[Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'repassword' : new FormControl('', [Validators.required])
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


  signup()   {
    if (this.myloginform.get('password').value === this.myloginform.get('repassword').value) {
      console.log(this.myloginform.value)
this.data.signup(this.myloginform.value);
this.myloginform.reset();
this.router.navigate(['../login']);
    }

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
