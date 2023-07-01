import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/service/appstate/app-state.service';
import { FacultyService } from 'src/app/service/data/faculty.service';
import { Faculty } from '../add-faculty/add-faculty.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
import { LoginComponent } from 'src/app/login/login.component';
import { AppDataService } from 'src/app/service/appdata/app-data.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GlobalVariablesService } from 'src/app/service/data/global-variables.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.css']
})
export class EditFacultyComponent implements OnInit {

  faculty_headers = ['S.No','Emp Type','First Name','Last Name','Skill','Phone','Occupation','Status','Edit','Salary'];
  pay_faculty_headers = ['Month','Mode','Salary','Paid','Date','User'];
  months: string[] = []
  years: string[] = []
  payModes: string[] = []
  empCount: number | undefined;
  filteredCount: number | undefined;
  payErrorMessage: string | undefined;

  currentYear = "2021"

  public faculty_details: any;
  closeResult = '';
  public data = [];
  public paidSalaryMessage = '';
  public isErrorPaidSalary=false;

  public efac: PaidSalary={
    payMonth: '',
    payYear: '',
    payMode: '',
    currentSalary: '',   
    paidSalary: '',   
    paidDate: '',
    loggedInUser: ''
  };

  constructor(
      public facultyservice:FacultyService,
      private router: Router,
      private appStateService: AppStateService,
      private modalService: NgbModal,
      private facService:FacultyService,
      private auth:AuthenticationServiceService,
      private appData: AppDataService,
      private toast: ToastrService,
      private global: GlobalVariablesService,
      public spinner: SpinnerService

    )
   { 
     this.getAllFacultyData() 
     
     
     this.payModes = appData.payModes;
     this.months = appData.getMonths();
     this.years = appData.getYears();
     this.currentYear = "2021";
     this.efac.loggedInUser = this.global._loggedInUserName;
    
   }

  ngOnInit(): void {

    currentYear:Date;
    let currentYear=new Date("YYYY").toString;    
  }

  getAllFacultyData(){
    this.facultyservice.getFacultyService().subscribe(
      data => {         
        this.faculty_details = data;
        this.empCount = this.faculty_details.length;        
        this.filteredCount = this.empCount;        
        
        console.log("before");
        console.log(this.faculty_details);
        this.appStateService.setAllFaculties(this.faculty_details);        
        console.log("after");
        console.log(this.faculty_details);
        
      }
      
    );

  }

  searchFacultyData(searchString: string){
    if (searchString !='') {
      searchString = searchString.toLowerCase();
      this.faculty_details = this.faculty_details.filter(
                                                            (fac: any) => fac.firstName.toLowerCase() === searchString || 
                                                                          fac.lastName.toLowerCase() === searchString || 
                                                                          fac.mobileNumber.toLowerCase() === searchString || 
                                                                          fac.employeeType.toLowerCase() === searchString || 
                                                                          fac.status.toLowerCase() === searchString
                                                        );    
      this.filteredCount = this.faculty_details.length;   
    }
  }

  loadEditFaculty(data: Faculty) {    
    this.appStateService.setFaculty(data);
    this.router.navigate(['editemployee',data._id], { state: {data} } )    
  }

  payFaculty(data: Faculty) {
    
    //var btn = document.getElementById('paidSalary')?.innerHTML;

    
    const efac: PaidSalary={
      payMonth: this.efac.payMonth,
      payYear: this.efac.payYear,
      payMode: this.efac.payMode,
      currentSalary: data.salary,   
      paidSalary: this.efac.paidSalary,   
      paidDate: new Date(),
      loggedInUser: this.global._loggedInUserName
    };

    for (let i=0;i < data.paidSalary?.length; i++)
    {
      if (data.paidSalary[i].payMonth === efac.payMonth && data.paidSalary[i].payYear === efac.payYear) {
        this.toast.error ("Already paid for this month. Please check")
        return;
      }
    }
    
    data.paidSalary?.push (efac);
    
    this.facService.saveFacultyService(data).subscribe(
      
      data => {  
        this.isErrorPaidSalary = false
        this.toast.success ("Pay Salary : Success")
        this.modalService.dismissAll()       
        
        this.efac = {
          payMonth: '',
          payYear: '',
          payMode: '',
          currentSalary: '',   
          paidSalary: '',   
          paidDate: '',
          loggedInUser: ''
        };

      },
       error => {
        if (error) { 
          this.isErrorPaidSalary = true
          this.toast.error ("Pay Salary : Error")
        }
       },
    );
  
  }

  private fac = new BehaviorSubject<Faculty[]>([]);
  search_faculty() {
    
  }


  open(content: any,data: any) {
    
    this.clear_payfaculty_form_values()
    this.data = data;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  clear_payfaculty_form_values() {
    document.forms.namedItem("payFacultyForm")?.reset;
    document.forms.namedItem("payfacultymodal")?.reset;
  }
  
  paysalary_mouseover() {
    console.log("Mouse over")
  }

}

export class PaidSalary{
  payMonth: string| undefined
  payYear: string| undefined  
  payMode: string | undefined
  currentSalary: string | undefined   
  paidSalary: string | undefined    
  paidDate: string | Date | undefined  
  loggedInUser: string | undefined    
}
