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
  public url : string;

  constructor(
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
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
}
