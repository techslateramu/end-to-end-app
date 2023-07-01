import { Component, Input, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/service/data/faculty.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  @Input() course: Course = new Course;

  constructor(
    private service:FacultyService
  ) {

  } 

  ngOnInit(): void {
  }

}

export class Course {
  courseName: string='';
  courseBatch: string='';
  courseFaculty: string='';
  courseFee: number=0;
}