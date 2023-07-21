import { Component, OnInit } from '@angular/core';
import { User } from '../../models/usermodel';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  public user!: User;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.user = new User('1', '', '', '', '', '', '', '', '', false);
  }

  onSubmit(registroForm: any) {
    this._userService.registrar(registroForm.value).subscribe(
      response => {
        this._router.navigate(['']);
      }, error => {

      }
    );
  }
}
