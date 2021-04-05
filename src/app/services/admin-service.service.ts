import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Administrator}from'../models/administrator';
import { SignUpRequest}from'../models/sign-up-request';
import { User } from '../models/user';
import { UrlSerializer } from '@angular/router';
import { Device } from '../models/device';
import { UserDevice } from '../models/user-device';
import { ConstraintCo2 } from '../models/constraint-co2';
import { Area } from '../models/area';
import { Space } from '../models/space';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private API_URL='http://localhost:9191/api/bws/admin';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

/*******GET ADMIN ******* */
getAdmin(cin:number):Observable<any>
{return this.http.get(`${this.API_URL}/${cin}`); }

/***** DEVICE MANAGMENT ***** */
deleteDevice(ref:string):Observable<any>{
  return this.http.delete(`${this.API_URL}/device/delete/${ref}`,{ responseType: 'text' });
}

addDevice(d:Device):Observable<any>{
  return this.http.post(`${this.API_URL}/device/add`,d);

}
/*
updateDevice(ref:string):Observable<any>{
  return this.http.post(`${this.API_URL}/update/${ref}`);
}*/

listdevices():Observable<any>
 {return this.http.get(`${this.API_URL}/device/all`);}

getDeviceByRef(ref:string):Observable<any>
{return this.http.get(`${this.API_URL}/device/${ref}`);}

/********* USER MANGMENT
 * list,get- get
 * add,update -post
 * delete -delete
 * ***** */
deleteUser(cin:number):Observable<any>
{return this.http.delete(`${this.API_URL}/user/delete/${cin}`,{ responseType: 'text' });}

addUser(signUpRequest):Observable<any>
{return this.http.post(`${this.API_URL}/user/add`,signUpRequest);}

listUsers():Observable<any>

{return this.http.get(`${this.API_URL}/user/all`);}

getUserByCin(cin:number):Observable<any>
{return this.http.get(`${this.API_URL}/user/${cin}`);}

/************** USER DEVIVCE MANAGMENT*********** */

affectUserDevice(ud:UserDevice):Observable<any>
{return this.http.post(`${this.API_URL}/userDevices/add`,ud);}

listUserDevices():Observable<any>
{return this.http.get(`${this.API_URL}/userDevices/all`);}


/************* CONSTRAINT CO2 MANGMENT ****** */

addConstraint(c:ConstraintCo2):Observable<any>
{return this.http.post(`${this.API_URL}/constraint/add`,c);}

updateConstraint(idConstraint:Number,c:ConstraintCo2):Observable<any>
{return this.http.put(`${this.API_URL}/constraint/update/${idConstraint}`,c);}

listConstraints():Observable<ConstraintCo2[]>
{return this.http.get<ConstraintCo2[]>(`${this.API_URL}/constraint/all`);}

deleteConstraint(idConstraint:Number):Observable<any>{
  return this.http.delete(`${this.API_URL}/constraint/delete/${idConstraint}`,{ responseType: 'text' });}

/********** AREA MANGMENT ***** */

addArea(a:Area):Observable<Object>
{return this.http.post(`${this.API_URL}/area/add`,a);}

listAreas():Observable<Area[]>
{return this.http.get<Area[]>(`${this.API_URL}/area/all`);}



/*****Space Management***** */
addSpace(s:Space):Observable<Object>
{return this.http.post(`${this.API_URL}/space/add`,s);}

listSpaces():Observable<any>
{return this.http.get(`${this.API_URL}/space/all`);}






}
