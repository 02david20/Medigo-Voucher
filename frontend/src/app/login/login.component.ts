import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private router:Router
  ) {}
  login() {
    this.userService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .then((response) => {
        const token:string = response.data.token;
        this.cookieService.set('jwt', token);
        alert("Login Successfully");
        this.router.navigate([''])
      })
      .catch((err) => {
        alert(err.response.data.error.message)
      });
  }
}
