import { Student } from 'src/app/component/add-student/add-student.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppDataService } from 'src/app/service/appdata/app-data.service';
import { AppStateService } from 'src/app/service/appstate/app-state.service';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
import { FacultyService } from 'src/app/service/data/faculty.service';
import { GlobalVariablesService } from 'src/app/service/data/global-variables.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  student_headers = ['S.No','First Name','Last Name','Phone','Email','Occupation','Status','Edit','Collect Fee'];
  collect_fee_headers = ['Month','Mode','Fee','Paid','Date','User'];
  months: string[] = []
  years: string[] = []
  payModes: string[] = []
  studentCount: number | undefined;
  filteredCount: number | undefined;
  payErrorMessage: string | undefined;

  currentYear = "2021"

  public student_details: any;
  closeResult = '';
  public data = [];
  public paidFeeMessage = '';
  public isErrorPaidFee=false;

  public collectedFee: CollectFee={
    payMode: '',
    payMonth: '',
    payYear: '',
    totalFee: '',   
    paidFee: '',   
    paidDate: '',
    loggedInUser: '',
    remarks: ''
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

  ) { 
    this.getAllStudentData() 
    this.payModes = appData.payModes;
    this.months = appData.getMonths();
    this.years = appData.getYears();
    this.currentYear = "2021";
    this.collectedFee.loggedInUser = this.global._loggedInUserName;
  }

  ngOnInit(): void {
    currentYear:Date;
    let currentYear=new Date("YYYY").toString;
  }

  getAllStudentData(){
    this.facultyservice.getStudentService().subscribe(
      data => { 
        this.student_details = data,
        this.studentCount = this.student_details.length;        
        this.filteredCount = this.studentCount
      }      
    );

  }

  searchStudentData(searchString: string){
    if (searchString !='') {
      searchString = searchString.toLowerCase();
      this.student_details = this.student_details.filter(
                                                            (student: any) => 
                                                            student.firstName.toLowerCase() === searchString || 
                                                            student.lastName.toLowerCase() === searchString || 
                                                            student.mobileNumber.toLowerCase() === searchString || 
                                                            student.email.toLowerCase() === searchString || 
                                                            student.status.toLowerCase() === searchString
                                                        );    
      this.filteredCount = this.student_details.length;   
    }
  }

  loadEditStudent(data: Student) {    
    this.appStateService.setStudent(data);
    this.router.navigate(['editstudent',data._id], { state: {data} } )    
  }


  collectFeeFromStudent(data: Student) {
    
    const collectFee: CollectFee={
      payMonth: this.collectedFee.payMonth,
      payYear: this.collectedFee.payYear,
      payMode: this.collectedFee.payMode,
      totalFee: '',
      paidFee: this.collectedFee.paidFee,   
      paidDate: new Date(),
      loggedInUser: this.global._loggedInUserName,
      remarks: this.collectedFee.remarks

    };

    for (let i=0;i < data.collectedFee?.length; i++)
    {
      if (data.collectedFee[i].payMonth === collectFee.payMonth && data.collectedFee[i].payYear === collectFee.payYear) {
        this.toast.error ("Already paid for this month. Please check")
        return;
      }
    }
    
     data.collectedFee?.push(collectFee);
    
    this.facService.saveStudentService(data).subscribe(
      
      data => {  
        this.isErrorPaidFee = false
        this.toast.success ("Collected Fee : Success")
        this.modalService.dismissAll()       
        
        this.collectedFee = {
          payMonth: '',
          payYear: '',
          payMode: '',
          totalFee: '',   
          paidFee: '',   
          paidDate: '',
          loggedInUser: '',
          remarks: ''
        };

      },
       error => {
        if (error) { 
          this.isErrorPaidFee = true
          this.toast.error ("Collect Fee : Error")
        }
       },
    );
  
  }

  open(content: any,data: any) {
    
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

}

export class CollectFee{
  payMonth: string| undefined
  payYear: string| undefined  
  payMode: string | undefined
  totalFee: string | undefined   
  paidFee: string | undefined    
  paidDate: string | Date | undefined 
  remarks: string | undefined
  loggedInUser: string | undefined  
}