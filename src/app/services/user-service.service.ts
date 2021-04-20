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

 updateSubUser(cinu:number,cin:number,signUpRequest:SignUpRequest):Observable<any>
  {
    return this.http.put(`${this.API_URL}/${cinu}/${cin}/SubUser/update`,signUpRequest);

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

newList(cinu:Number):Observable<any>
{return this.http.get(`${this.API_URL}/${cinu}/SubUserSpace/all`);}

/************** LIST OF SPACE PER DEVICE /USER *********** */
listUserSpacesperDevice(cinu:Number):Observable<any>
{return this.http.get(`${this.API_URL}/SpacesPerUserDevice/${cinu}`);}


listAreaperUser(cinu:Number):Observable<any>
{return this.http.get(`${this.API_URL}/AreasPerUser/${cinu}`);}

SCNDlistUserSpacesperDevice(cinu:Number):Observable<any>
{return this.http.get(`${this.API_URL}/SpacesPerUserDevice2/${cinu}`);}

}
