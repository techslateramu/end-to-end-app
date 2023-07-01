import { Component, Input, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppStateService } from 'src/app/service/appstate/app-state.service';
import { FacultyService } from 'src/app/service/data/faculty.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-add-master-course',
  templateUrl: './add-master-course.component.html',
  styleUrls: ['./add-master-course.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddMasterCourseComponent implements OnInit {

  @Input() masterCourse: MasterCourse = new MasterCourse;

  pageHeader = "Add More..."
  master_courses_details: any;

  constructor(    
    public service:FacultyService,
    public LoaderService: LoaderService,
    private toast: ToastrService,
    public spinner: SpinnerService,
    public appStateService: AppStateService,
    public router: Router
    ) { 
      this.getAllMasterCoursesData()
    }

  ngOnInit(): void {
  }

  addMasterCourse() {
    
    for (let i=0;i < this.master_courses_details?.length; i++)
    {
      if (this.master_courses_details[i].courseName === this.masterCourse.courseName) {
          this.toast.error ("Course already exists")
        return;
      }
    }
    this.service.saveMasterCourse(this.masterCourse).subscribe(
      data => {          
        this.toast.success(this.pageHeader + " : Success")
        this.getAllMasterCoursesData()
      },
       error => {
        if (error) {         
        this.toast.error("Error while saving. Contact Support!")        
        }
       },       
    );
  }
  
  getAllMasterCoursesData(){
    this.service.getAllMasterCourses().subscribe(
      data => { 
        this.master_courses_details = data      
      }    
    );
  }
  
}

export class MasterCourse {
  courseName: string='';
  courseFee: string='';
}

