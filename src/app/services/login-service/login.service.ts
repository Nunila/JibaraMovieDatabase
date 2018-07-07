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

  public firebaseDB;

  private USERS: Array<User> = [
    {email: 'nunila.davila@upr.edu', username: 'nunila', password: 'admin'},
    {email: 'test@mail.com', username:'elpapisongo', password:'bestnovioever'},
    {email: '', username:'familia', password:'familia'}
  ]
  private allowToModify = false;
   
  

  constructor(private router:Router) { 
    var config = {
      apiKey: "AIzaSyDidGk8b07SkZ4PF8uoAa5mum4FD4El1Qc",
      authDomain: "jibaramoviedatabase.firebaseapp.com",
      databaseURL: "https://jibaramoviedatabase.firebaseio.com",
      projectId: "jibaramoviedatabase",
      storageBucket: "jibaramoviedatabase.appspot.com",
      messagingSenderId: "1003292774172"
  };
    firebase.initializeApp(config);
    this.firebaseDB = firebase.database();

  }

  login(user){
    if (user.username == 'admin') this.allowToModify = true;
    else if (this.USERS.find(uu => {return uu.email == user.username || uu.username == user.username})) {
      this.allowToModify = true;
    }
    else {
      this.allowToModify = false;
    }

    firebase.auth().signInWithEmailAndPassword(user.username, user.password).catch(function(error) {
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    this.router.navigate([`/home`]);
    
  }

  logout(){
    firebase.auth().signOut().then(function() {
      console.log('success!!!')
    }).catch(function(error) {
      // An error happened.
    });
  }

  getAccess(){
    return this.allowToModify;
  }
}
