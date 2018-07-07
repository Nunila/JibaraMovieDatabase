import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services/login-service/login.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private userinfo = {
    username : '',
    password : ''
  }

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(){
    this.loginService.login(this.userinfo);
    this.userinfo.password = '';
    this.userinfo.username = '';
  }

  checkKey(e){
    if (e.key == "Enter")  this.loginService.login(this.userinfo);
  }

}
