import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
declare const firebase: any;
declare const $:any;


@Injectable()
export class DataService {
  public navshow = false;
  public bookdata:any;
  public users:any;
  public logerror : any;
  public userdet: any
public userkey :any;
constructor(private router:Router) {
  firebase.database().ref('books').on('value',(snapshot)=>{
    let arr = []
    const deta= Object.keys(snapshot.val()).map(k=> {return snapshot.val()[k]})
    deta.forEach((e)=>{
      arr.push(e);
    });
    this.bookdata = arr;
  });

this.getdata();
}
login(user: any) {
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((data: any) =>     {
    this.getdata();
    }
  )
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        console.log('wrong password');
      } else {
        console.log('wrong password');
      }
      this.logerror = 'Sorry, ' + error.code;
      $('#loginbox').css({
        'border' : '1px solid red'
      })
      setTimeout(() => {
        this.logerror = '';
      },5000);

    });
}
logwithgoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().signInWithPopup(provider).then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    let cust = result.user;
    }).catch((error) =>{
    console.log(error)
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
  });
}
getdata()
{
    let  user  = firebase.auth().currentUser
    if(user){
      firebase.database().ref().child("details").orderByChild("email").equalTo(user.email).once('value', (snap) => {
      this.userdet = snap.val();
      this.userkey = Object.keys(this.userdet).map(k => {return k; })[0]
      this.userdet = Object.keys(this.userdet).map(k => {
        return this.userdet[k];
      })[0]

        firebase.database().ref('details').on('value',(snapshot)=>{
          let arr1 = []
          const user= Object.keys(snapshot.val()).map(k=> {return snapshot.val()[k]})
          user.forEach((e)=>{
            if(e.email != this.userdet.email){
              arr1.push(e);
            }

          });
          this.users = arr1;

        });
    });

  }
}
signup(s: any) {
  firebase.auth().createUserWithEmailAndPassword(s.email, s.password).catch((error)=>{
     this.logerror = 'Sorry, ' + error.code;    // ...
    setTimeout(() => {
      this.logerror = '';
    },5000);
    $('#signupbox').css({
      'border' : '1px solid red'
    })
  }).then(() => {
    const nee = {
      name : s.name,
      phone : '',
      git : '',
      linkedin:'',
      email : s.email,
      place:'',
      about : '',
      booksfollowed : [],
      }
    firebase.database().ref('details').push(nee).then(() => {
      this.logerror = 'Successfully signed up ';
      setTimeout(() => {
        this.logerror = '';
      }, 5000);
    });


  });
}
  isAuthenticated() {
    let user = firebase.auth().currentUser;

    if(user) {
if(!this.userdet)
{
  this.getdata()
}
      return true;
    } else {

      return false;
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {

      this.router.navigate(['../login']);
      this.userdet = null
    }, (error: any) =>{
      console.log(error);
    });

  }
  postcomments(a:any,b:any,c:any){
  console.log(a,b)
    a["name"] = firebase.auth().currentUser.email
    firebase.database().ref().child("books").orderByChild("title").equalTo(b.title).once('value',r => {
      let id = Object.keys(r.val()).map(k => {return k})[0]
      if(b.comment)
      {
        b.comment.push(a)
      }
      else {
        b["comment"] = []
        b.comment.push(a)
      }
      firebase.database().ref("books/"+id).set(b).then(r => {
        c.reset()
      })

    })

  }
  updatebook(a:any,b:any){
  firebase.database().ref("books/"+ a).update(b)
  }
  update()
  {
      if(!this.userdet)
    {
      this.getdata()
    }
    firebase.database().ref("details/" + this.userkey).remove();
    firebase.database().ref("details").push(this.userdet);
  }
  addBooks(s:any){
  firebase.database().ref("books").push(s);
  }


follow(a:any){
  firebase.database().ref().child("books").orderByChild("title").equalTo(a.title).once('value',r => {
    let id = Object.keys(r.val()).map(k => {return k})[0]

    firebase.database().ref("books/"+id).set(a)

  })
}


}
