import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { User } from "../models/usermodel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url : string;
  public token : any;
  public identity : any;

  constructor(
    private _http : HttpClient
  ) {
    this.url = GLOBAL.url
   }

   registrar(user: any): Observable<any>{
    const obj = {
      nombre: user.nombre,
      email: user.email,
      password: user.password
    }

    console.log(obj);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(GLOBAL.registro, obj, {headers: headers});
   }

   login(user: any, gettoken: any = null): Observable<any>{
    const json = user;
    if(gettoken != null){
      user.gettoken = true;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(GLOBAL.login, json, {headers: headers});
   }

   get_users(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(GLOBAL.get_users, {headers: headers});
   }

   get_user(id: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tmpUrl = `${GLOBAL.get_user}/${id}`;
    return this._http.get(tmpUrl, {headers: headers});
   }

   get_message(de: any, para: any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tmpUrl = `${GLOBAL.data_msm}/${de}/${para}`;
    return this._http.get(tmpUrl, {headers: headers});
   }

   getToken(){
    const token = localStorage.getItem('token');
    if(token){
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
   }

   getIdentity(){
    const identity = JSON.parse(localStorage.getItem('identity')!);

    if(identity){
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
   }
}
