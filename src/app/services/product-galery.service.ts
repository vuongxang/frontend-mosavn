import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductGaleryService {
  private API_URL = 'http://localhost:8000/api/product-galery';
  constructor(private http: HttpClient) { }

  addProductGalery(obj): Observable<any>{
    let url = this.API_URL;
    return this.http.post<any>(url,obj);
  }

  removeByid(id): Observable<any>{
    let url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(url);
  }
}
