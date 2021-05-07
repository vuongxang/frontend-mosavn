import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category } from '../models/category';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  // private API_URL = 'https://6065dc19b8fbbd00175678fd.mockapi.io/categories';
  private API_URL = 'http://localhost:8000/api/category';
  private token = '';
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  }

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
    ) {
      this.token = this.authenticationService.currentUserValue.token;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        })
      }
     }

  getCateById(id: Number): Observable<any> {
    let url = `${this.API_URL}/${id}`;
    return this.http.get < any > (url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAll(num: Array<any>): Observable<any> {
    let url = `${this.API_URL}/?page=${num[0]}&&pagesize=${num[1]}`;
    console.log(this.httpOptions);
    return this.http.get < any > (url,this.httpOptions);
  }

  addCate(cate: Category): Observable<any> {
    return this.http.post < any > (this.API_URL, cate, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  editCate(obj: Category): Observable<any> {
    let url = `${this.API_URL}/${obj.id}`;
    return this.http.put < any > (url, obj,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeById(id): Observable<any> {
    let url = `${this.API_URL}/${id}`;
    return this.http.delete< any >(url)
      .pipe(
        catchError(this.handleError)
      );
  } 

  getAllCates(){
    let url = `${this.API_URL}/list`;
    return this.http.get<any>(url);
  }
}
