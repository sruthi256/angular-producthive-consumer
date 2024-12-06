import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

//service layer interacts with the restAPI

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:8088/producthive/api/products'

  constructor(private http:HttpClient) { }

  //makes GET request to spring boot rest-api
  getProductList():Observable<any>{
    return this.http.get(this.baseURL)
    .pipe(
      catchError(this.handleError1) //handles errors
    );
  }

  // Handle errors globally
  private handleError1(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));  // Return an observable with a user-facing error message
  }
}
