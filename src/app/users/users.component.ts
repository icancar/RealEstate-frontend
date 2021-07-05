import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService:UsersService, private router:Router, private notifier:NotifierService) { 
    this.notifier=notifier;
  }


  loginForm:FormGroup;
  submitted:boolean
  

  ngOnInit(): void {
    this.notifier.notify('error', 'welcome');
    this.submitted=false;
    this.loginForm=new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  get username() {
    return this.loginForm.get('username');
 }
 get password() {
  return this.loginForm.get('password');
}

  login() {
    this.submitted=true;
    if(this.loginForm.valid){
    let username=this.loginForm.get('username').value;
    let password=this.loginForm.get('password').value;
    this.usersService.login(username, password).subscribe((user:User)=>{
      if(user){
        localStorage.setItem('ulogovan', JSON.stringify(user));
        this.router.navigate(['home']);
      }
      else{
        this.notifier.notify('error',"NO SUCCESS")
      }
    })}
    else {
      this.notifier.notify('warning',"Enter password or username")
    }
  }

  
}
