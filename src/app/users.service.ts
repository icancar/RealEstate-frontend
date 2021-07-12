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
      accepted:user.accepted
    }
    return this.http.post(`${this.uri}/users/register`,data)
  }

  changePassword(username, oldPassword, newPassword){
    const data={
      username:username,
      oldPassword:oldPassword,
      newPassword:newPassword
    }
    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  getAllRegistrationRequests() {
    return this.http.get(`${this.uri}/admin/getAllRegistrationRequests`);
  }


  acceptRegistrationRequest(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/admin/acceptRegistrationRequest`,data)
  }

  declineRegistrationRequest(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/admin/declineRegistrationRequest`,data)
  }

  updateUserInfo(username, name, surname, city, country) {
    const data = {
      username:username,
      name:name,
      surname:surname,
      city:city,
      country:country,
    }
    return this.http.post(`${this.uri}/users/editUserInfo`, data)
  }

  updatePhoto(username, path){
    const data = {
      username:username,
      path:path
    }
    return this.http.post(`${this.uri}/users/updateProfilePhoto`, data)
  }

  getUserFromUsername(username){
    const data = {
      username:username,
    }
    return this.http.post(`${this.uri}/users/getUserFromUsername`, data)
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/users/getAllUsers`);
  }
  
  deleteUser(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/deleteUser`, data);
  }
}
