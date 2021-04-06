import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpRequest } from '../models/sign-up-request';
import { Space } from '../models/space';
import { SubUserSpace } from '../models/sub-user-space';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private API_URL='http://localhost:9191/api/bws/user';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
/****** SUB USER MANGMENT **** */
  addSubUser(cinu:number,signUpRequest:SignUpRequest):Observable<any>
  {
    return this.http.post(`${this.API_URL}/${cinu}/SubUser/add`,signUpRequest);

  }

  deleteSubUser(cinu:number):Observable<any>
  {
    return this.http.delete(`${this.API_URL}/SubUser/delete/${cinu}`);
  }
listSubUserByUser(cinu:number):Observable<any>{
return this.http.get(`${this.API_URL}/${cinu}/SubUser/all/`);
}


getuserBySubUser(cin:number):Observable<any>
{return this.http.get(`${this.API_URL}/${cin}`);}



/************** EMPLOYEE SAPCE MANAGMENT*********** */

affectSubUserSpace(ss:SubUserSpace):Observable<any>
{return this.http.post(`${this.API_URL}/SubUserSpace/add`,ss);}

listSubUserSpaces():Observable<any>
{return this.http.get(`${this.API_URL}/SubUserSpace/all`);}

listUserSpacesperDevice(cinu:Number):Observable<any>
{return this.http.get(`${this.API_URL}/SpacesPerUserDevice/${cinu}`);}


SCNDlistUserSpacesperDevice(cinu:Number):Observable<any>
{return this.http.get(`${this.API_URL}/SpacesPerUserDevice2/${cinu}`);}

}
