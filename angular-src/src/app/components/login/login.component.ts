import { Component, OnInit } from '@angular/core';
// import { UserLogin } from 'src/app/Models/userLogin';

import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  ngOnInit(): void {}

  constructor(
    private authServive: AuthService,
    private router: Router,
    private _flashMessage: FlashMessagesService
  ) {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };
    // handling the service subscription reponse
    this.authServive.authenticateUser(user).subscribe((data) => {
      const response = JSON.parse(JSON.stringify(data));
      if (response.success) {
        // add user to localStorage
        this.authServive.storeUserData(response.token, response.user);
        this._flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000,
        });
        this.router.navigate(['dashboard'])
      } else {
        this._flashMessage.show(response.msg, {
          cssClass: 'alert-danger',
          timeout: 5000,
        });
        this.router.navigate(['login'])
      }
    });
  }
}
