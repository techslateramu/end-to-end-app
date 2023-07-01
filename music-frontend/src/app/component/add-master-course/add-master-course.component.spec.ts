import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterCourseComponent } from './add-master-course.component';

describe('AddMasterCourseComponent', () => {
  let component: AddMasterCourseComponent;
  let fixture: ComponentFixture<AddMasterCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMasterCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
