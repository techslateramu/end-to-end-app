import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  
export class AuthenticationServiceService {

  public loggedInUser: string | undefined;

  constructor() { 
  }
  
  authenticate(username: any, password: any){
    if ((username==='ramu' && password==='sandbox123') || (username==='rajesh' && password==='tms123')) {
      sessionStorage.setItem('authenticatedUser', username);
      this.loggedInUser=username;
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser')
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem('authenticatedUser')
  }
  
}
