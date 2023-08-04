import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { UserService } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public socket = io('http://localhost:4201');

  public identity: any;
  public url: string;
  public urlGetImage: string;
  public de: any;
  public datos_config: any = {};
  public datos_user: any = {};
  public data: any = {};
  public pass: string = "";
  public confirm_pass: string = "";
  public msm_error?: string;
  public usuarios: any;
  public data_send : any = {};
  public msm_success? : string;

  public file?: File;
  public imgSelected?: string | ArrayBuffer;

  constructor(
    private _userService : UserService,
    private _router: Router
  ){
    this.url = GLOBAL.url;
    this.urlGetImage = GLOBAL.get_img;
    this.identity = this._userService.getIdentity();
    this.de = this.identity._id;
  }

  ngOnInit(): void {
    if(this.identity){
      this._userService.get_user(this.de).subscribe(
        (response: any) => {
          this.datos_user = response.user;
          this.data = {
            nombre: this.datos_user.nombre,
            email: this.datos_user.email,
            telefono: this.datos_user.bio,
            twitter: this.datos_user.twitter,
            facebook: this.datos_user.facebook,
            estado: this.datos_user.estado
          }


        }, (error: any) => {

        }
      )
    } else {
      this._router.navigate(['']);
    }
  }

  imgSelect(event: any){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSelected = reader.result!;
      reader.readAsDataURL(this.file);
    }
  }

  OnSubmit(configForm: any){
    if(configForm.valid){
      if(this.validatePass(configForm.value.password)){
        if(configForm.value.password != configForm.value.confirm_password){
          this.msm_error = 'Las contraseñas no son iguales';
        } else {

          this.msm_error = "";
          this.data_send = {
            _id: this.datos_user._id,
            ...configForm.value,
            imagen: this.file
          }

          this.socket.emit('save-user', {identity: this.data_send});

          this._userService.update_config(this.data_send).subscribe(
            (response: any) => {
              this.msm_success = 'Se actualizó tu perfil con éxito';

              this._userService.get_users().subscribe(
                (response: any) => {
                  this.usuarios = response.users;
                  this.socket.emit('save-users', this.usuarios);
                }, (error: any) => {
                  console.log('get_users error', error);
                }
              )
            }, (error: any) => {
              console.log('update_config error', error);
            }
          );
        }
      } else {
        //
        this.msm_error = "";
        this.data_send = {
          _id: this.datos_user._id,
          ...configForm.value,
          imagen: this.file
        }

        delete this.data_send.password;

        this.socket.emit('save-user', {identity: this.data_send});

        this._userService.update_config(this.data_send).subscribe(
          (response: any) => {
            this.msm_success = 'Se actualizó tu perfil con éxito';

            this._userService.get_users().subscribe(
              (response: any) => {
                this.usuarios = response.users;
                this.socket.emit('save-users', this.usuarios);
              }, (error: any) => {
                console.log('get_users error 2', error);
              }
            )
          }, (error: any) => {
            console.log('update_config error 2', error);
          }
        );

      }

      this.msm_success = '';
    }
  }

  private validatePass(pass: string): boolean{
    let val: boolean = false;

    if(pass != undefined)
      if(pass > "")
        val = true;

    return val;
  }
}
