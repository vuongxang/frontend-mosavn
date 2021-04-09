import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product';

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

  removeByid(id: number): Observable<any>{
    let url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(url);
  }

  addProduct(obj: Product): Observable<any>{
    let url = this.API_URL;
    return this.http.post<any>(url,obj);
  }

  editProduct(obj: Product): Observable<any> {
    let url = `${this.API_URL}/${obj.id}`;
    return this.http.put < any > (url, obj);
  }
  // removeMultiple(idList: Array<any>): Observable<any>{
  //   let requestUrl = idList.map(
  //     id => this.http.delete<any>(`${this.API_URL}/${id}`)
  //   );
  // }
}
