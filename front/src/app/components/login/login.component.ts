import { Component, OnInit } from '@angular/core';
import { User } from "../../models/usermodel";
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user!: User;
  public token!: any;
  public identity!: any;
  public data_user: any;
  public usuarios: any;
  public socket = io(GLOBAL.url);

  constructor(
    private _userService : UserService,
    private _router: Router
  ){
    this.data_user = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.user = new User('1', '', '', '', '', '', '', '', '', false);

    if(this.data_user){
      this._router.navigate(['messenger']);
    }
  }

  onSubmit(loginForm: any){
    if(loginForm.value){
      this._userService.login(this.user).subscribe(
        response => {
          this.token = response.jwt;
          this.identity = JSON.stringify(response.user);

          localStorage.setItem("token", this.token);

          this._userService.login(this.user, true).subscribe(
            response => {
              localStorage.setItem('identity', this.identity);
              this._userService.activar(response.user._id).subscribe(
                (response: any) => {
                  this._userService.get_users().subscribe(
                    (res_getusers: any) => {
                      this.usuarios = res_getusers.users;
                      this.socket.emit('save-users', this.usuarios);
                    }, (err_getUsers: any) => {
                    }
                  )
                },
                (error: any) => {}
              )
              this._router.navigate(['messenger']);
            }, error => {

            }
          )
        }, error => {
          console.log('error', error);
        }
      )
    } else {
      console.log('Datos no validos')
    }
  }
}
