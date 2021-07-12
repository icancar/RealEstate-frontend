import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EstateService } from '../estate.service';
import { Estate } from '../models/estate';
import { User } from '../models/user';

@Component({
  selector: 'app-estate-requests',
  templateUrl: './estate-requests.component.html',
  styleUrls: ['./estate-requests.component.css']
})
export class EstateRequestsComponent implements OnInit {

  constructor(private estateService:EstateService, private router:Router, private notifier:NotifierService) { }

  isLoggedIn:boolean
  user:User;
  allRequestedEstates: Estate[];
  ngOnInit(): void {
    this.isLoggedIn=JSON.parse(localStorage.getItem('ulogovan'))!=null;
    if(!this.isLoggedIn){
      this.logout();
    }else {
      this.user=JSON.parse(localStorage.getItem('ulogovan'));
      if(this.user.userType=='korisnik'){
        this.logout();
      }
    }
    this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
      if(e){
        this.allRequestedEstates=e;
      }
    })
  }

  details(id){
    this.router.navigate(['/estateInfo/'+id]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate['/'];
  }
  
  acceptEstateRequest(id){
    this.estateService.acceptEstateRequest(id).subscribe((res)=>{
      if(res['message']=='requestAccepted'){
        this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
          if(e){
            this.allRequestedEstates=e;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })

  }

  declineEstateRequest(id){
    this.estateService.declineEstateRequest(id).subscribe((res)=>{
      if(res['message']=='requestDeclined'){
        this.estateService.getAllEstatesRequest().subscribe((e:Estate[])=>{
          if(e){
            this.allRequestedEstates=e;
          }
        })
      }else {
        this.notifier.notify('error', res['message']);
      }
    })

  }
}
