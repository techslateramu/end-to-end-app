import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';
import { SpinnerService } from '../service/spinner/spinner.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    
    constructor(public loaderService: LoaderService,
                public spinnerService: SpinnerService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.isLoading.next(true);
        this.loaderService.isLoading.next(true);        
        return next.handle(req)
         .pipe(
             retry(2),
             catchError(
                 (error: HttpErrorResponse) => {
                    this.loaderService.isLoading.next(false);
                    console.log("error message  " + error.message);
                    return throwError(error)    }
             ),

             finalize(
                () => {
                    this.spinnerService.isLoading.next(false)                    
                }
             )       
             
        )

    }
}