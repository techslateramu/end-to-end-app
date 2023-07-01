import { AddMasterCourseComponent } from './component/add-master-course/add-master-course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { AddBatchComponent } from './component/add-batch/add-batch.component';
import { AddFacultyComponent } from './component/add-faculty/add-faculty.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { EditFacultyComponent } from './component/edit-faculty/edit-faculty.component';
import { ListBatchComponent } from './component/list-batch/list-batch.component';
import { ListStudentComponent } from './component/list-student/list-student.component';
import { PayFacultyComponent } from './component/pay-faculty/pay-faculty.component';
import { StudentEnquiryComponent } from './component/student-enquiry/student-enquiry.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGauardService } from './service/route-guard-service.service';
import { AddExpenseComponent } from './component/add-expense/add-expense.component';

const routes: Routes = [
  {path:'',component: LoginComponent},
  {path:'login',component: LoginComponent},
  {path:'logout',component: LogoutComponent},
  {path:'welcome',component: WelcomeComponent,canActivate:[RouteGauardService]},
  {path:'studentenquiry',component: StudentEnquiryComponent, canActivate:[RouteGauardService]},
  {path:'liststudent',component: ListStudentComponent, canActivate:[RouteGauardService]},
  {path:'addstudent',component: AddStudentComponent, canActivate:[RouteGauardService]},
  {path:'editstudent/:_id',component: AddStudentComponent, canActivate:[RouteGauardService]},
  {path:'addemployee',component: AddFacultyComponent,canActivate:[RouteGauardService]},
  {path:'editemployee',component: EditFacultyComponent,canActivate:[RouteGauardService]},
  {path:'about',component: AboutComponent,canActivate:[RouteGauardService]},
  {path:'editemployee/:_id',component: AddFacultyComponent,canActivate:[RouteGauardService]},
  {path:'payemployee/:_id',component: PayFacultyComponent,canActivate:[RouteGauardService]},
  {path:'addbatch', component: AddBatchComponent,canActivate:[RouteGauardService]},
  {path:'listbatch', component: ListBatchComponent,canActivate:[RouteGauardService]},
  {path:'editbatch/:_id',component: AddBatchComponent,canActivate:[RouteGauardService]},
  {path:'addmastercourse', component: AddMasterCourseComponent,canActivate:[RouteGauardService]},
  {path:'addexpense', component: AddExpenseComponent,canActivate:[RouteGauardService]},
  {path:'**',component: ErrorComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
