import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-my-estates',
  templateUrl: './my-estates.component.html',
  styleUrls: ['./my-estates.component.css']
})
export class MyEstatesComponent implements OnInit {

  constructor(private estateService:EstateService, private router:Router) { }
  isLoggedIn:boolean;
  myEstates:Estate[];
  user:User;
  username:string;
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("ulogovan"))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.userType=='agent'){
        this.username='agencija'
      }else this.username=this.user.username;
      this.estateService.getAllEstatesForUser(this.username).subscribe((e:Estate[])=>{
        if(e){
          this.myEstates=e;
        }
      })

    }else {
      this.router.navigate(['/']);
    }
  }

    details(id){
      this.router.navigate(['/estateInfo/'+id]);
    }
  

  logout(){
    localStorage.clear();
    this.router.navigate['/'];
  }

  edit(id){
    this.router.navigate(["/editEstateInfo/"+id]);
  }

}
