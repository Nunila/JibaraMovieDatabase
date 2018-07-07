import { Injectable } from '@angular/core';
import { Routes, Router } from '@angular/router';

var firebase = require("firebase/app");

require("firebase/auth");

interface User {
  email: string,
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private USERS: Array<User> = [
    {email: 'nunimarga@gmail.com', username: 'nunila', password: 'admin'},
    {email: '', username:'elpapisongo', password:'bestnovioever'},
    {email: '', username:'familia', password:'familia'}
  ]
  private allowToModify = false;
  

  constructor(private router:Router) { }

  login(user){
    if (user.username == 'admin') this.allowToModify = true;
    else if (this.USERS.find(uu => {return uu.email == user.username || uu.username == user.username})) {
      this.allowToModify = true;
    }
    else {
      this.allowToModify = false;
    }

    this.router.navigate([`/home`]);
    // firebase.auth().signInWithEmailAndPassword(user.username, user.password).catch(function(error) {
    //   console.log(error);
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  }

  logout(){
    // firebase.auth().signOut().then(function() {
    //   console.log('success!!!')
    // }).catch(function(error) {
    //   // An error happened.
    // });
  }

  getAccess(){
    return this.allowToModify;
  }
}
