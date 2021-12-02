import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  public customersData: any = null

  private urlCommonLink = "http://localhost:8000/"
  private customerssUrl = "api/manage/customers/"
  
  constructor(private _http: HttpClient) { }

  getCustomers():Observable<any>{
    return this._http.get(`${this.urlCommonLink}${this.customerssUrl}`)
  }

  addCustomers(data:any):Observable<any>{
    return this._http.post(`${this.urlCommonLink}${this.customerssUrl}addnewcustomer`,data)
  }

  deleteCustomer(id: any): Observable<any>{
    return this._http.delete(`${this.urlCommonLink}${this.customerssUrl}/deletecustomer/${id}`)
  }

}
