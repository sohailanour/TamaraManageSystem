import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productData: any = null

  private urlCommonLink = "http://localhost:8000/"
  private productsUrl = "api/manage/products/"
  

  constructor(private _http: HttpClient) { }
  
  register(data:any): Observable<any>{
    return this._http.post(`${this.urlCommonLink}${this.productsUrl}addnewproduct`,data)
  }
  
  getProducts():Observable<any>{
    return this._http.get(`${this.urlCommonLink}${this.productsUrl}`)
  }

  deleteProduct(id:any): Observable<any>{
    return this._http.delete(`${this.urlCommonLink}${this.productsUrl}deleteproduct/${id}`)
  }

  editProduct(id: any,data:any): Observable<any>{
    return this._http.patch(`${this.urlCommonLink}${this.productsUrl}editproduct/${id}`, data)
  }
}
