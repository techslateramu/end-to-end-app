import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { GlobalVariablesService } from '../service/data/global-variables.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username=''
  password = ''
  errorMessage='Invalid Credentials'
  loginMessage='Success'
  invalidLogin = false
  public globalusername = '---'
  
  //Create Router Instance and route it on condition
  //Dependency Injection


  constructor(private router: Router, 
              private auth: AuthenticationServiceService,
              private global: GlobalVariablesService) { }

  ngOnInit(): void {
    
  }

  handleLogin(){

    //if (this.username==='ramu' && this.password==='sru') {
    if (this.auth.authenticate(this.username,this.password)) {
      this.global._loggedInUserName = this.username;
      this.globalusername = this.username
      this.invalidLogin=false     
      this.router.navigate(['welcome'])      
    }

  else{
    this.invalidLogin=true
  }  
  
  }

}
