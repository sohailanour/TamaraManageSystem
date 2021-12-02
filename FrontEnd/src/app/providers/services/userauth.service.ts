import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  public isAuthed = false
  public userData:any = null
  private commonUrlLink="http://localhost:8000/api/manage/users/";
  constructor(private _http: HttpClient) { }
 
  loginUser(userData: any): Observable<any> {
    return this._http.post(`${this.commonUrlLink}login`, userData)
  }
  
  profile(): Observable<any> {
    return this._http.get(`${this.commonUrlLink}profile`)
  }

   logout(): Observable<any> {
    return this._http.get(`${this.commonUrlLink}logout`)
   }
  
   logouAll(): Observable<any> {
    return this._http.get(`${this.commonUrlLink}logoutAll`)
  }

  adminAuth(): Observable<any> {
    return this._http.get(`${this.commonUrlLink}`)
  }

  registerAuth(userData :any): Observable<any>{
    return this._http.post(`${this.commonUrlLink}register`, userData)
  }

  deleteUser(id :any): Observable<any>{
    return this._http.delete(`${this.commonUrlLink}deleteUSer/${id}`)
  }

  edituser(id: any,newdata:any): Observable<any>{
    return this._http.patch(`${this.commonUrlLink}edituser/${id}`,newdata)
  }

  getuser(id: any): Observable<any>{
    return this._http.get(`${this.commonUrlLink}getuser/${id}`)
  }

  editprofile(userData: any): Observable<any> {
    return this._http.patch(`${this.commonUrlLink}editProfile`,userData)
  }
}