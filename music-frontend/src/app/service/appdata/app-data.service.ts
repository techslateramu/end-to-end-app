import { Injectable } from '@angular/core';
import { FacultyService } from '../data/faculty.service';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  
  facultyNames: any;
  
  getMonths():string[] {
    return new Array("January","February","March","April","May","June","July","August","September","October","November","December")
  }

  getYears():string[] {
    return new Array("2021","2022","2023")
  }

  getFacultyNames() {
    this.service.getFacultyService().subscribe( (faculties: any[]) => {
      this.facultyNames = faculties.filter((faculty) => faculty.employeeType.toLowerCase() === 'faculty')
      .map(faculty => faculty.firstName);
    }
    )
  }

  payModes: string[] = []
  payMonths: string[] = []
  payYears: string[] = []
  
  constructor(
      public service:FacultyService
  )

    {
      this.payModes = ['Bank Transfer','Card','Cash','PayTM']   
      this.payMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      this.payYears = ["2021","2022","2023"]      
     }
}
