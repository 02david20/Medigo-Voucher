import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3000/"


  async login(username:string, password:string) {
    return axios.post(this.url+'users/login', {
      username: username,
      password: password
    })    
  }
  constructor() { }
}
