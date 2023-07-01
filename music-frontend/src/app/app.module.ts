import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentEnquiryComponent } from './component/student-enquiry/student-enquiry.component';
import { AddFacultyComponent } from './component/add-faculty/add-faculty.component';
import { FacultyService } from './service/data/faculty.service';
import { CustomHttpInterceptor } from './interceptor/app-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditFacultyComponent } from './component/edit-faculty/edit-faculty.component';
import { AboutComponent } from './component/about/about.component';
import { PayFacultyComponent } from './component/pay-faculty/pay-faculty.component'; 
import { AuthenticationServiceService } from './service/authentication-service.service';
import { AppDataService } from './service/appdata/app-data.service';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AddBatchComponent } from './component/add-batch/add-batch.component';
import { ListBatchComponent } from './component/list-batch/list-batch.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { ListStudentComponent } from './component/list-student/list-student.component';
import { AddCourseComponent } from './component/add-course/add-course.component';
import { CommonModule } from '@angular/common';
import { AddMasterCourseComponent } from './component/add-master-course/add-master-course.component';
import { AddExpenseComponent } from './component/add-expense/add-expense.component';

import { MatTabsModule} from '@angular/material/tabs';
import { MatFileUploadModule} from 'angular-material-fileupload';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    LogoutComponent,
    StudentEnquiryComponent,
    AddFacultyComponent,
    EditFacultyComponent,
    AboutComponent,
    PayFacultyComponent,
    WelcomeComponent,
    AddBatchComponent,
    ListBatchComponent,
    AddStudentComponent,
    ListStudentComponent,
    AddCourseComponent,
    AddMasterCourseComponent,
    AddExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    CommonModule,
    MatTabsModule,
    MatFileUploadModule,
    MatSnackBarModule
    ],
  providers: [
    AppDataService,
    FacultyService,
    AuthenticationServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    EditFacultyComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
