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
    return this._http.post(this.url + 'registro', obj, {headers: headers});
   }
}
