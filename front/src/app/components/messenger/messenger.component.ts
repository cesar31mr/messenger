import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { Message } from 'src/app/models/messagemodel';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import Push from 'push.js';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {

  @ViewChild('scrolMe', {static:false}) private myScrollContainer?: ElementRef;

  public usuarios: any;
  public get_img: string;
  public user_select = { _id: -1, nombre: '', imagen: '' };
  public mensajes: any;
  public identity: any;
  public token: any;
  public de: any;
  public data_msm: any;
  public send_message: any;
  public socket = io(GLOBAL.url);

  constructor(private _userService: UserService, private _router: Router) {
    this.get_img = GLOBAL.get_img;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.de = this.identity._id;
    this.data_msm = new Message('', '', '', '');
  }

  ngOnInit(): void {
    if (this.identity) {
      this._userService.get_users().subscribe(
        (response) => {
          const res: any = response;
          this.usuarios = res.users;
        },
        (error) => {}
      );

      this.socket.on('new-message', this.handleMessageReceivedEvent.bind(this));
      this.socket.on('new-users', this.handleStateEvent.bind(this));
    } else {
      this._router.navigate(['']);
    }
  }

  scrollToBotom():void{
    try {
      this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer!.nativeElement.scrollHeight;
    } catch (error) {

    }
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.scrollToBotom();
  }

  private handleMessageReceivedEvent(data: any): void {
    const data_all = {
      de: data.message.de,
      para: data.message.para,
      msm: data.message.msm,
      createAt: data.message.createAt,
    };

    this._userService.get_user(data.message.de).subscribe(
      (response: any) => {
        if (response.user._id != this.de) {
          Push.create(response.user.nombre, {
            body: data.message.msm,
            icon: this.get_img + response.user.imagen,
            timeout: 10000,
            onClick: function () {
              window.focus();
              close();
            },
          });

          (document.getElementById('player') as any).load();
          (document.getElementById('player') as any).play();
        }
      },
      (error: any) => {}
    );

    this.mensajes.push(data_all);
  }

  private handleStateEvent(data: any): void {
    this.usuarios = data.users;
  }

  listar(id: any) {
    this._userService.get_user(id).subscribe(
      (response: any) => {
        this.user_select = response.user;

        this._userService.get_message(this.de, id).subscribe(
          (response: any) => {
            this.mensajes = response.messages;
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }

  onSubmit(msmForm: any) {
    if (msmForm) {
      this.send_message = {
        de: this.de,
        para: this.user_select._id,
        msm: this.data_msm.msm,
      };

      if (this.data_msm.msm > '')
        this._userService.get_send_msm(this.send_message).subscribe(
          (response: any) => {
            this.data_msm.msm = '';
            this.socket.emit('save-message', response.message);
            this.scrollToBotom();
          },
          (error) => {}
        );
    }
  }

  logout() {
    this._userService.desactivar(this.de).subscribe(
      (response: any) => {
        this._userService.get_users().subscribe(
          (res_getusers: any) => {
            this.usuarios = res_getusers.users;
            this.socket.emit('save-users', this.usuarios);
          },
          (err_getUsers: any) => {}
        );
      },
      (error: any) => {}
    );

    localStorage.removeItem('token');
    localStorage.removeItem('identity');

    this.identity = '';
    this.token = '';

    this._router.navigate(['']);
  }
}
