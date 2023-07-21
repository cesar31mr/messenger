import { Component, OnInit } from '@angular/core';
import { User } from "../../models/usermodel";
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';

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
          console.log(response);
          this.token = response.jwt;
          this.identity = JSON.stringify(response.user);

          localStorage.setItem("token", this.token);

          this._userService.login(this.user, true).subscribe(
            response => {
              localStorage.setItem('identity', this.identity);
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
