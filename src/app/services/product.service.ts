import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'http://localhost:8000/api/product';

  constructor( private http: HttpClient ) { }

  findById(id): Observable<any>{
    let url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  getAll(): Observable<any>{
    let url = this.API_URL;
    return this.http.get<any>(url);
  }

  // removeMultiple(idList: Array<any>): Observable<any>{
  //   let requestUrl = idList.map(
  //     id => this.http.delete<any>(`${this.API_URL}/${id}`)
  //   );
  // }
}
