import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppStateService } from 'src/app/service/appstate/app-state.service';
import { FacultyService } from 'src/app/service/data/faculty.service';
import { GlobalVariablesService } from 'src/app/service/data/global-variables.service';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';
import { Batch } from '../add-batch/add-batch.component';

@Component({
  selector: 'app-list-batch',
  templateUrl: './list-batch.component.html',
  styleUrls: ['./list-batch.component.css']
})
export class ListBatchComponent implements OnInit {

  batch_headers = ['S.No','Batch Name','Batch Type','Faculty Name','Batch Days','Batch Time','Start Date','Status','Edit'];
  batchCount: number | undefined;
  filteredBatchCount: number | undefined;
  public batch_details: any;

  
  constructor(
    private facultyservice:FacultyService,
    private router: Router,
    private appStateService: AppStateService,      
    private toast: ToastrService,
    private global: GlobalVariablesService,
    public spinner: SpinnerService
    
  ) { 
    this.getAllBatchData() 
  }

  ngOnInit(): void {
  }

  getAllBatchData(){
    this.facultyservice.getBatchService().subscribe(
      data => { 
        this.batch_details = data,
        this.batchCount = this.batch_details.length;        
        this.filteredBatchCount = this.batchCount
      }
      
    );

  }

  searchBatchData(searchString: string){
    if (searchString !='') {
      searchString = searchString.toLowerCase();
      this.batch_details = this.batch_details.filter(
                                                      (batch: any) => 
                                                      batch.batchName.toLowerCase() === searchString || 
                                                      batch.batchType.toLowerCase() === searchString || 
                                                      batch.batchFaculty.toLowerCase() === searchString || 
                                                      //batch.batchDays.toLowerCase() === searchString || 
                                                      batch.batchTime.toLowerCase() === searchString ||
                                                      batch.batchStatus.toLowerCase() === searchString
                                                    );    
      this.filteredBatchCount = this.batch_details.length;   
    }
  }

  loadEditBatch(data: Batch) {    
    this.appStateService.setBatch(data);
    this.router.navigate(['editbatch',data._id], { state: {data} } )    
  }

}
