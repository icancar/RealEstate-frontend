import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from '../models/user';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(private notifier:NotifierService,private router:Router, private userService:UsersService) { }

  user:User;
  allUsers:User[];
  isLoggedIn:boolean;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.userType!='administrator'){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      this.userService.getAllUsers().subscribe((u:User[])=>{
        if(u){
          this.allUsers=u;
        }
      })
    }else{
      this.logout();
    }

  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  deleteUser(username){
    this.userService.deleteUser(username).subscribe((res)=>{
      if(res['message']=='userDeleted'){
        this.notifier.notify("success", "User deleted")
        this.userService.getAllUsers().subscribe((u:User[])=>{
          if(u){
            this.allUsers=u;
          }
        })
      }
    })
  }

  acceptRequest(username){
    this.userService.acceptRegistrationRequest(username).subscribe((res)=>{
      if(res['message']=='userAccepted'){
        this.notifier.notify("success", "User accepted")
        this.userService.getAllUsers().subscribe((u:User[])=>{
          if(u){
            this.allUsers=u;
          }
        })
      }
    })
  }

  details(username){
    this.router.navigate(['/editProfile/'+username]);
  }
}
