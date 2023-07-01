import { MasterCourse } from './../../component/add-master-course/add-master-course.component';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Batch } from 'src/app/component/add-batch/add-batch.component';
import { Faculty } from 'src/app/component/add-faculty/add-faculty.component';
import { Student } from 'src/app/component/add-student/add-student.component';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() { }

  _faculty: ReplaySubject<Faculty> = new ReplaySubject<Faculty>();
  _allFaculties: ReplaySubject<Array <Faculty>> = new ReplaySubject<Array <Faculty>>();
  _batch: ReplaySubject<Batch> = new ReplaySubject<Batch>();
  _student: ReplaySubject<Student> = new ReplaySubject<Student>();  
  _masterCourse: ReplaySubject<MasterCourse> = new ReplaySubject<MasterCourse>();

  setStudent(student: Student): void {
    this._student.next(student);
  }

  get student(): ReplaySubject<Student> {
    return this._student;
  }
  
  setAllFaculties(faculty: Array<Faculty>): void {
    this._allFaculties.next(faculty);
  }

  get allFaculties(): ReplaySubject<Array<Faculty>> {
    return this._allFaculties;
  }


  setFaculty(faculty: Faculty): void {
    this._faculty.next(faculty);
  }

  get faculty(): ReplaySubject<Faculty> {
    return this._faculty;
  }

  setBatch(batch: Batch): void {
    this._batch.next(batch);
  }

  get batch(): ReplaySubject<Batch> {
    return this._batch;
  }

  get masterCourse(): ReplaySubject<MasterCourse> {
    return this._masterCourse;
  }
  
  setMasterCourse(masterCourse: MasterCourse): void {
    this.masterCourse.next(masterCourse);
  }

}
