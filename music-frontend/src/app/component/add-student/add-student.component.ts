import { Batch } from 'src/app/component/add-batch/add-batch.component';
import { Component, Input, OnInit,  ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListBatchComponent } from '../list-batch/list-batch.component';
import { v4 as uuidv4 } from 'uuid';
import { FacultyService } from 'src/app/service/data/faculty.service';
import { AppStateService } from 'src/app/service/appstate/app-state.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';
import { LoaderService } from 'src/app/service/loader.service';
import { Course } from '../add-course/add-course.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'src/app/service/appdata/app-data.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddStudentComponent implements OnInit {

  @Input() course: any;

  public pageHeader="Add Student";
  payModes = this.appData.payModes;
  payMonths = this.appData.payMonths;
  payYears = this.appData.payYears;
  feeHeaders = ['Month','Year','Mode','Total Fee','Paid Fee','Remarks']
  courseHeaders = ['Course Name','Batch','Faculty','Fee']
  
  public collectedFee: CollectedFee = {
    payMode: '',
    payMonth: '',
    payYear: '',
    totalFee: '',
    paidFee: '',   
    remarks: '',
    loggedInUser: '' 
  };

  public student: Student={
    _id: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    gName: '',
    doj: '',
    occupation: '',
    status: 'Active',
    comments: '',
    courses: [],
    collectedFee: [],
    temp: 'ramu',
    admissionFeeActual: 1500,
    admissionFeeCollected: ''
  };
  
  closeResult='';
  edit_student: boolean = false;
  courseFlag: number=0;

  constructor(
    public service:FacultyService,
    public LoaderService: LoaderService,
    private router: Router,
    private appstateService: AppStateService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toast: ToastrService,
    public spinner: SpinnerService,
    private appData: AppDataService

  ) { 
    this.appstateService.student.subscribe (
      student => { 
      if (student._id==this.route.snapshot.params['_id'])
       {
            this.edit_student = true
            this.student = student
            this.pageHeader="Edit Student : " + this.student.firstName;
        }
      }
     )
  }

  ngOnInit(): void {
  }

  addStudent() {

    this.student._id=="" ? this.student._id=uuidv4() : this.student._id=this.student._id;
    this.student.collectedFee?.push(this.collectedFee);
    this.service.saveStudentService(this.student).subscribe(
      data => {          
        this.toast.success(this.pageHeader + " : Success")        
      },
       error => {
        if (error) {         
        this.toast.error("Error while saving. Contact Support!")        
        }
       },       
       () => {
        console.log("")
      }
    );

  }

  routeToAdd(){
    this.router.navigate(['addstudent'])    
  }

  addCourse() {
    
    if (this.courseFlag === 3) {
      this.toast.toastrConfig.preventDuplicates = true;      
      this.toast.warning("Maximum courses : 3")
      return;
    }
    
    this.courseFlag=this.courseFlag+1 ;
    this.student.courses.push(new Course())
  }


  
  open(content: any) {    
    this.modalService.open(content, {ariaLabelledBy: 'modal-admission'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, );
  }

}


export class Student {
  _id: string='';
  firstName: string='';
  lastName: string | undefined;
  mobileNumber: string | undefined;
  email: string | undefined;

  gName: string | undefined;
  occupation: string | undefined;
  doj: string | undefined;
  status: string | undefined;

  comments: string | undefined;
  courses: Array<Course> = [new Course()];
  collectedFee: Array<CollectedFee> = [];
  // collectedFee: Array<CollectedFee> = [new CollectedFee()];
  // collectedFee: Array<CollectedFee> | undefined;
  admissionFeeActual: number | undefined;
  admissionFeeCollected: string | undefined;
  temp: string | undefined;

}

export class CollectedFee{
  payMode: string | undefined
  payMonth: string| undefined
  payYear: string | undefined
  totalFee: string | undefined
  paidFee: string | undefined    
  remarks: string | undefined
  loggedInUser: string | undefined
}
