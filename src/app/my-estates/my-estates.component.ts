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
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem("ulogovan"))!=null;
    if(this.isLoggedIn){
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      this.estateService.getAllEstatesForUser(this.user.username).subscribe((e:Estate[])=>{
        if(e){
          this.myEstates=e;
        }
      })

    }else {
      this.router.navigate(['/']);
    }
  }

}
