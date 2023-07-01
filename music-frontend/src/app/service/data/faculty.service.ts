import { ToastrModule } from 'ngx-toastr';
import { Faculty } from 'src/app/component/add-faculty/add-faculty.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  public add_teacher_api =  "addTeacher"
  public get_teacher_api =  "getAllTeachers"
  public add_student_api =  "addStudent"
  public get_student_api =  "getAllStudents"
  public add_batch_api = "addBatch"
  public get_batch_api = "getBatches"
  public add_master_course_api = "addMasterCourse"
  public get_master_course_api = "getAllMasterCourses"  
  public add_save_expense_api = "saveExpense"

  public list_fac: any;

  faculty_names: any;

  constructor(private http:HttpClient) { 
    this.getFacultyNames()
  }

  saveStudentService(student: Data): Observable<any> {
    return this.http.post<any>(  environment.backend_url + this.add_student_api, student)
  }

  getStudentService(): Observable<any> {
    return this.http.get<any>( environment.backend_url + this.get_student_api)    
  }

  saveFacultyService(fac: Data): Observable<any> {
    return this.http.post<any>(  environment.backend_url + this.add_teacher_api ,fac)
  }
  
  getFacultyService(): Observable<any> {
    this.list_fac = this.http.get<any>( environment.backend_url + this.get_teacher_api)
    return this.list_fac
  }

  // private async fetchData(){
  //   const data = await this.httpClient.get(this.apiUrl).toPromise();
  //   console.log("Data: " + JSON.stringify(data)); 
  // }
  
  public async getFacultyNames(){ 
    
    // return this.list_fac.subscribe((faculties: any[]) => {
    //   this.faculty_names = faculties.filter((faculty) => faculty.employeeType.toLowerCase() === 'faculty')
    //   .map(faculty => faculty.firstName);
    //   return this.faculty_names;
    // })

    const data = await this.list_fac.toPromise();
    
    return data().then((faculties: any[]) => {
        this.faculty_names = faculties.filter((faculty) => faculty.employeeType.toLowerCase() === 'faculty')
        .map(faculty => faculty.firstName);
      return this.faculty_names;
    })


    // return this.list_fac.map((faculty_names: { filter: (arg0: boolean) => any; employeeType: string; }) => faculty_names.filter( faculty_names.employeeType.toLowerCase() === 'faculty'));
  }

  
//   this.faculty_details = this.faculty_details.filter(
//     (fac: any) => fac.firstName.toLowerCase() === searchString || 
//                   fac.lastName.toLowerCase() === searchString || 
//                   fac.mobileNumber.toLowerCase() === searchString || 
//                   fac.employeeType.toLowerCase() === searchString || 
//                   fac.status.toLowerCase() === searchString
// );    


  saveBatchService(batch: Data): Observable<any> {
    return this.http.post<any>(  environment.backend_url + this.add_batch_api ,batch)
  }

  getBatchService(): Observable<any> {
    return this.http.get<any>( environment.backend_url + this.get_batch_api)    
  }

  saveMasterCourse(masterCourse: Data): Observable<any> {
    return this.http.post<any>(  environment.backend_url + this.add_master_course_api ,masterCourse)
  }

  getAllMasterCourses(): Observable<any> {
    return this.http.get<any>( environment.backend_url + this.get_master_course_api)
      
  }

  saveExpense(expense: Data): Observable<any> {
    return this.http.post<any>(  environment.backend_url + this.add_save_expense_api ,expense)
  }

  
  handleError(error: any) {
    return throwError(error.message || "error" );    
  }

}
