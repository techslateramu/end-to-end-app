import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFacultyComponent } from './pay-faculty.component';

describe('PayFacultyComponent', () => {
  let component: PayFacultyComponent;
  let fixture: ComponentFixture<PayFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayFacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
