import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {

  constructor(private router:Router,private userService:UsersService, private notifier:NotifierService) { }

  isLoggedIn:boolean
  registrationRequestUsers: User[];
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    this.userService.getAllRegistrationRequests().subscribe((users:User[])=>{
      if(users){
        this.registrationRequestUsers=users;
      }
    })

  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  acceptRegistrationRequest(username){
    this.userService.acceptRegistrationRequest(username).subscribe((res)=>{
      if(res['message']=='userAccepted'){
        this.userService.getAllRegistrationRequests().subscribe((users:User[])=>{
          if(users){
            this.registrationRequestUsers=users;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })
  }

  declineRegistrationRequest(username){
    this.userService.declineRegistrationRequest(username).subscribe((res)=>{
      if(res['message']=='userDeclined'){
        this.userService.getAllRegistrationRequests().subscribe((users:User[])=>{
          if(users){
            this.registrationRequestUsers=users;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })
  }

}
