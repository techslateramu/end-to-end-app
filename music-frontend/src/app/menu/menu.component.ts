import { Component, OnInit } from '@angular/core';
import { EditFacultyComponent } from '../component/edit-faculty/edit-faculty.component';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { FacultyService } from '../service/data/faculty.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
isUserLoggedIn: boolean = false;

  constructor(
    public auth: AuthenticationServiceService,
    public service:FacultyService,
    public editfaculty: EditFacultyComponent
    ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
  }
    
}


export class NgbdDropdownBasic {
}
