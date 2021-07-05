import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(user:User){
    const data= {
      ime:user.ime,
      prezime:user.prezime,
      username:user.username,
      password:user.password,
      picture:user.picture,
      email:user.email,
      city:user.city,
      country:user.country,
      userType:"korisnik",
      accepted:false
    }
    return this.http.post(`${this.uri}/users/register`,data)
  }
}
