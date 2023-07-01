import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from 'src/app/service/data/faculty.service';
import { v4 as uuidv4 } from 'uuid';
import { AppStateService } from 'src/app/service/appstate/app-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from '../add-faculty/add-faculty.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddBatchComponent implements OnInit {

  @Input() fac:any;

  public pageHeader = "Add Batch"
  public batchTypes=['Online','One-One','ClassRoom'];
  public batch: Batch={_id: '',  batchName:'', batchType: '', batchFaculty: '',batchDays: [],batchTime: [],batchStartDate: '',batchStatus: ''  };
  public faculty: Faculty | undefined;
  public faculties: Array<Faculty> = [];


  constructor(
    public service:FacultyService,
    private toast: ToastrService,
    private appstateService: AppStateService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) 
  {  
    
    this.appstateService.batch.subscribe (
    batch => { 
      if (batch._id==this.route.snapshot.params['_id'])
         {
            this.batch = batch
            this.pageHeader="Edit Batch : " + this.batch.batchName;
          }
      }
   )
   
   this.appstateService.allFaculties.subscribe(    
    allFaculties => { 
      this.faculties = allFaculties;
      }      
    )

  }

  ngOnInit(): void {
    pageHeader: "Add Batch"    
    console.log(" faculty names ");
    console.log(this.service.faculty_names);
    // console.log(this.service.getFacultyNames());
  }


  addBatch() {
    this.batch._id=="" ? this.batch._id=uuidv4() : this.batch._id=this.batch._id;

    this.service.saveBatchService(this.batch).subscribe(
      data => {  
        //this.toast.success(this.pageHeader + " : Success")        
        this.snackBar.open(this.pageHeader + " : Success","",
          { duration: 3000, 
                // panelClass: ['mat-toolbar', 'mat-primary']
          panelClass: ['green-snackbar'],
          //verticalPosition: 'bottom',
          //horizontalPosition: 'center'

        })
      },
       error => {
        if (error) { 
        this.toast.error("Error while saving. Contact Support!")
      }
       },
       
    );
  }

  navigateToAddBatch() {
    this.router.navigate(['addbatch'])
  }

}

export class Batch {
  _id: string='';
  batchName: string='';
  batchType: string='';
  batchFaculty: string='';
  batchDays: Array<string> | undefined;
  batchTime: Array<number> | undefined;
  batchStartDate: string='';
  batchStatus: string='';
}
