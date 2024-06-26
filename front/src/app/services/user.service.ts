import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { User } from "../models/usermodel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token : any;
  public identity : any;

  constructor(
    private _http : HttpClient
  ) {
   }

   registrar(user: any): Observable<any>{
    const obj = {
      nombre: user.nombre,
      email: user.email,
      password: user.password
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(GLOBAL.registro, obj, {headers: headers});
   }

   update_config(user: any): Observable<any>{
    const fd = new FormData();
    Object.keys(user).forEach((element: any) => {
      fd.append(element, user[element]);
    });


    const tmpUrl = `${GLOBAL.editar_config}/${user._id}`;
    return this._http.put(tmpUrl, fd);
   }

   login(user: any, gettoken: any = null): Observable<any>{
    const json = user;
    if(gettoken != null){
      user.gettoken = true;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(GLOBAL.login, json, {headers: headers});
   }

   get_users(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(GLOBAL.get_users, {headers: headers});
   }

   get_user(id: any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tmpUrl = `${GLOBAL.get_user}/${id}`;
    return this._http.get(tmpUrl, {headers: headers});
   }

   get_message(de: any, para: any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tmpUrl = `${GLOBAL.data_msm}/${de}/${para}`;
    return this._http.get(tmpUrl, {headers: headers});
   }

   get_send_msm(msm:any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(GLOBAL.send_msm, msm, {headers: headers});
   }

   activar(id: any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tmpUrl = `${GLOBAL.activar_estado}/${id}`;
    return this._http.put(tmpUrl, {headers: headers});
   }

   desactivar(id: any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tmpUrl = `${GLOBAL.desactivar_estado}/${id}`;
    return this._http.put(tmpUrl, {headers: headers});
   }

   getToken(): Observable<any>{
    const token = localStorage.getItem('token');
    if(token){
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
   }

   getIdentity(): Observable<any>{
    const identity = JSON.parse(localStorage.getItem('identity')!);

    if(identity){
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
   }


}
