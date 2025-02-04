import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            let modalStateErrors: string[] = [];

            // Case 1: error.error is an array of error objects
            if (Array.isArray(error.error)) {
              modalStateErrors = error.error.map((err: any) => `${err.code}: ${err.description}`);
            }
            // Case 2: error.error has an 'errors' property (object with arrays)
            else if (error.error.errors) {
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(...error.error.errors[key].map((err: any) => `${err.code}: ${err.description}`));
                }
              }
            }
            
            if (modalStateErrors.length > 0) {
              const errorMessage = modalStateErrors.join('\n');
              toastr.error(errorMessage, 'Bad Request');
              return throwError(() => modalStateErrors);
            } else {
              // Fallback if error.error is a simple string or something else.
              toastr.error(error.error, 'Bad Request');
            }
            break;

          case 401:
            toastr.error('Unauthorised', error.status);
            break;

          case 404:
            router.navigateByUrl('/not-found');
            break;

          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;

          default:
            toastr.error('Something unexpected went wrong');
            break;
        }
      }
      return throwError(() => error);
    })
  );
};
