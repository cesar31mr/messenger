import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit{

  public usuarios: any;
  public get_img : string;
  public user_select: any;
  public mensajes: any;
  public identity: any;
  public de: any;

  constructor(
    private _userService: UserService
  ){
    this.get_img = GLOBAL.get_img;
    this.identity = this._userService.getIdentity();
    this.de = this.identity._id;
  }

  ngOnInit(): void {
    this._userService.get_users().subscribe(
      response => {
        const res : any = response;
        this.usuarios = res.users;
      }, error => {

      }
    )
  }

  listar(id: any){
    this._userService.get_user(id).subscribe(
      response => {
        const res : any = response;
        this.user_select = res.user;

        this._userService.get_message(this.de, id).subscribe(
          response => {
            const msm : any = response;
            this.mensajes = msm.messages;
          }, error => {

          }
        )
      }, error => {

      }
    )
  }
}
