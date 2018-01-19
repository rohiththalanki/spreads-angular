import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DataService} from "../../services/data.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let firebase:any
declare let $:any
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy, AfterViewInit {
  public commentsform: FormGroup;
  public data: any;
public id:any
  public sub: any;
  private route$: Subscription;
  public likes :number;
  constructor(private route: ActivatedRoute, private datas: DataService, private rou: Router)  {
    this.datas.navshow = true;
    this.commentsform = new FormGroup({
      'comments': new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.

        this.id = +params['id'];
        firebase.database().ref("books/"+this.id).on("value" , data => {
          console.log(data)
         let  g = data.val()
          if(!g.followed)
          {
            g["followed"]= []
          }
          if(!g.rating)
          {
            g["rating"] = [0]
          }
          if(!g.ratingusers)
          {
            g["ratingusers"] = []
          }
          this.data = g

        })

      });
  }
  ngAfterViewInit(){

      
      if(this.data.rating.indexOf(this.datas.userdet.email) > -1) {
        $('.ui.heart.rating')
          .rating({
            initialRating: this.data.rating.reduce((a,b) => a+b,0)/this.data.rating.length,
            maxRating: 5
          }).rating("disable")
        ;
      }
      else {
        $('.ui.heart.rating')
          .rating({
            initialRating: this.data.rating.reduce((a,b) => a+b,0)/this.data.rating.length,
            maxRating: 5
          }).rating("enable")
        ;
      }

      $('.ui.heart.rating')
        .rating('setting', 'onRate', (value) => {
          this.data.rating.push(value)
          this.data.ratingusers.push(this.datas.userdet.email)
          this.datas.updatebook(this.id,this.data)
          $('.rating')
            .rating("set rating", this.data.rating.reduce((a,b) => a+b,0)/this.data.rating.length)
          ;
        });




  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  followbook(){
    console.log(this.data.followed.indexOf(firebase.auth().currentUser.email))
    this.data.followed.push(firebase.auth().currentUser.email)
    this.datas.follow(this.data)
  }

  author()  {
    let cache = [];
    const t = JSON.stringify(this.data, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null;
    this.rou.navigate(['../author'], {queryParams : {id: t}});
  }

  like() {


    }
  postcomment(){
    this.datas.postcomments(this.commentsform.value, this.data,this.commentsform);
  }


}
