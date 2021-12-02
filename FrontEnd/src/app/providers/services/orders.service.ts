import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public orderData: any = null

  private urlCommonLink = "http://localhost:8000/"
  private ordersUrl = "api/manage/orders/"
  

  constructor(private _http: HttpClient) { }
  
  addOrder(data:any): Observable<any>{
    return this._http.post(`${this.urlCommonLink}${this.ordersUrl}addneworder`,data)
  }
  
  getOrders():Observable<any>{
    return this._http.get(`${this.urlCommonLink}${this.ordersUrl}`)
  }

}
