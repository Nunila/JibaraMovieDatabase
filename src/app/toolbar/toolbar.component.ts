import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service/login.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
  }

  getAccess(){
    return this.loginService.getAccess();
  }

}
