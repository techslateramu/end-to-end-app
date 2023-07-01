import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

public _loggedInUserName = ""
  
constructor(    
  ) { 
    
    this._loggedInUserName = this._loggedInUserName;

  }
}
