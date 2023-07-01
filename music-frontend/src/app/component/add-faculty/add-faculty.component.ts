import { formatCurrency } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct,NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppStateService } from 'src/app/service/appstate/app-state.service';
import { FacultyService } from 'src/app/service/data/faculty.service';
import { LoaderService } from 'src/app/service/loader.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent implements OnInit {
  
@Input() public fac: Faculty={
  _id: '',
  employeeType:'',
  firstName: '',
  lastName: '',
  mobileNumber: '',
  email: '',
  occupation: '',
  comments: '',
  preferredDays: [],
  preferredTime: [],
  skill: [],
  doj: '',
  status: '',
  salary: '',
  paidSalary:[]
};
  
public isFacultySaveError = false
public isButtonClicked = false
public facultySaveMessage = ""
public pageHeader="Add Employee";
public facultyType=['Faculty','Admin','Management'];

constructor(
    public service:FacultyService,
    public LoaderService: LoaderService,
    private router: Router,
    private appstateService: AppStateService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    public spinner: SpinnerService
  ) 
  { 
    this.appstateService.faculty.subscribe (
      faculty => { 
      if (faculty._id==this.route.snapshot.params['_id'])
       {
            this.fac = faculty
            this.pageHeader="Edit Employee : " + this.fac.firstName;
        }
      }
     )

    
  }

  ngOnInit(): void {
    // this.appstateService.allFaculties.subscribe (
    //   allFaculties => { 
    //     this.allFaculties = allFaculties;
    //   }
    //  )
  }

  addFaculty(){
    
    this.fac._id=="" ? this.fac._id=uuidv4() : this.fac._id=this.fac._id;

    this.facultySaveMessage = "Saving data, please wait ... "
    this.service.saveFacultyService(this.fac).subscribe(
      data => {  
        this.isFacultySaveError = false
        this.toast.success(this.pageHeader + " : Success")        
        this.facultySaveMessage = ""
        this.appstateService.setFaculty(this.fac);
      },
       error => {
        if (error) { 
        this.isFacultySaveError = true 
        this.toast.error("Error while saving. Contact Support!")
        this.facultySaveMessage = ""
      }
       },
       
    );
  }

  routeToAdd(){
    this.router.navigate(['addemployee'])    
  }
 
}

export class PaidSalary{
  payMonth: string| undefined
  payMode: string | undefined
  paidSalary: string | undefined    
  payYear: string | undefined;
}

export class Faculty {
  _id: string='';
  employeeType: string='';
  firstName: string='';
  lastName: string | undefined;
  mobileNumber: string | undefined;
  email: string | undefined;
  occupation: string | undefined;
  preferredDays: Array<string> | undefined;
  comments: string | undefined;
  doj: string | undefined;
  salary: string | undefined;
  status: string | undefined;
  preferredTime: Array<string>| undefined;
  skill: Array<string>| undefined;
  paidSalary: Array<PaidSalary> = [];
}

