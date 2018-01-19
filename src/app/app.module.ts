import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {DataService} from './services/data.service';
import {SpreadComponent} from './components/spreads/spread.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {CourseComponent} from './components/course/course.component';
import {AuthGuard} from "./services/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import { AddbookComponent } from './components/addbook/addbook.component';
@NgModule({
  declarations: [
    AppComponent, HomeComponent, SpreadComponent , LoginComponent, SignupComponent, CourseComponent, ProfileComponent, AddbookComponent ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '' , redirectTo : '/home' , pathMatch : 'full'},
      {path : 'home', component : HomeComponent},
      {path : 'spread', component: SpreadComponent},
      {path : 'login' , component: LoginComponent},
      {path : 'signup' , component: SignupComponent},
      {path : 'course' , component : CourseComponent},
      {path : 'profile', component : ProfileComponent},
      {path : 'addbook', component : AddbookComponent},
      ])
  ],
  providers: [DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
